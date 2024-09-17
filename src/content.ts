import { loginTemplate } from "./templates/login_template";
import { mainTemplate } from "./templates/main_template";
import { createAliasCard } from "./templates/alias_card_template";
import { createAliasTemplate } from "./templates/create_aliase_template";
import { emptyStateTemplate } from "./templates/empty_state_template";
import { loadingTemplate } from "./templates/loading_template";
import { errorTemplate } from "./templates/error_template";
import { checkIfUserIsAuthenticated, generateAlias, logout, copyToClipboard } from "./utils";
import { getAliases } from "./services/aliases/getAliases";
import { createLabel } from "./services/labels/createLabel";
import { fetchCurrentUser } from "./services/user/fetchCurrentUser";
import { Alias } from "./types/Alias";
import { addIcon, closeIcon } from "./templates/search_template";
import { createFilter } from "./services/filters/createFilter";
import { deleteLabel } from "./services/labels/deleteLabel";
import { deleteFilterByAlias } from "./services/filters/deleteFilterByLabelId";
import { footerTemplate } from "./templates/footer_template";

(() => {
  let isAliasCreationVisible = false;

  const toggleButtonState = (button: HTMLButtonElement, isLoading: boolean) => {
    button.textContent = isLoading ? "Creating..." : "Create Alias";
    button.disabled = isLoading;
  };

  const showAlert = (message: string) => alert(message);

  const attachEventListeners = (selector: string, eventType: string, handler: EventListener) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach(element => {
      element.addEventListener(eventType, handler);
    });
  };

  const addLogoutCapability = () => {
    const logoutButton = document.querySelector(".logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", handleLogout);
    }
  };

  const showLoginTemplate = () => {
    const container = document.querySelector("#container");
    if (container) {
      container.innerHTML = loginTemplate;
    }
  };
  
  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      try {
        const success = await logout();
        if (success) {
          console.log("User logged out successfully");
          showLoginTemplate();
        } else {
          console.error("Failed to log out.");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  const renderContent = async (searchQuery: string = "") => {
    const content = document.querySelector("#content");
    if (!content) {
      console.log("Content container is not found");
      return;
    }

    content.innerHTML = loadingTemplate;

    try {
      let aliases = await getAliases();
      if (searchQuery) {
        aliases = aliases.filter(alias => alias.alias.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      if (aliases.length > 0) {
        content.innerHTML = aliases.map((item: Alias) => createAliasCard(item)).join("");
      } else {
        content.innerHTML = emptyStateTemplate;
      }

      content.innerHTML += footerTemplate;
      addLogoutCapability();

    } catch (error) {
      console.error("Error fetching aliases:", error);
      content.innerHTML = errorTemplate; 
    }
  };

  const createAliasAndFilter = async () => {
    const aliasInput = document.querySelector(".alias-input") as HTMLInputElement;
    if (!aliasInput || aliasInput.value.trim() === "") {
      showAlert("Alias cannot be empty.");
      return;
    }

    const createAliasButton = document.querySelector(".create-alias-button") as HTMLButtonElement;
    toggleButtonState(createAliasButton, true);

    try {
      const user = await fetchCurrentUser();
      const label = await createLabel(aliasInput.value.trim());
      const alias = generateAlias({ label, email: user.emailAddress });
      await createFilter(alias, label.id);
      
      aliasInput.value = "";
      toggleAliasCreationView();
    } catch (error) {
      console.error('Error creating alias and filter:', error);
      showAlert("Error creating alias and filter.");
    } finally {
      toggleButtonState(createAliasButton, false);
    }
  };

  const deleteLabelAndFilter = async (event: Event) => {
    console.log({event})
    const target = event.currentTarget as HTMLElement;
    const alias = target.getAttribute("data-alias");
    const labelId = target.getAttribute("data-labelId");

    if (!labelId || !alias) {
      console.error("Label id or alias not found");
      return;
    }

    if (!confirm(`Are you sure you want to delete ${alias}?`)) {
      console.log("User canceled the deletion.");
      return;
    }

    try {
      await deleteFilterByAlias(alias);
      await deleteLabel(labelId);
      await renderContent();
    } catch (error) {
      console.error('Error deleting label and filter:', error);
    }
  };

  const addCopyToClipboardCapability = () => attachEventListeners(".clipboard-icon", "click", copyToClipboard)

  const addDeletionCapability = () => attachEventListeners(".delete-icon", "click", deleteLabelAndFilter);

  const renderForm = () => {
    const content = document.querySelector("#content");
    if (content) {
      content.innerHTML = createAliasTemplate;
      const createAliasButton = document.querySelector(".create-alias-button");
      if (createAliasButton) {
        createAliasButton.addEventListener("click", createAliasAndFilter);
      }
    }
  };

  const toggleAliasCreationView = () => {
    isAliasCreationVisible = !isAliasCreationVisible;
    const content = document.querySelector("#content");
    const addButton = document.querySelector(".add-button");

    if (content) {
      if (addButton) {
        addButton.innerHTML = isAliasCreationVisible ? closeIcon : addIcon;
      }
      if (isAliasCreationVisible) {
        renderForm();
      } else {
        renderContent();
      }
    }
  };

  document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector("#container");
    const isAuthenticated = await checkIfUserIsAuthenticated();

    if (isAuthenticated) {
      if (container) {
        container.innerHTML = mainTemplate;
      }
      await renderContent();

      const addButton = document.querySelector(".add-button");
      if (addButton) {
        addButton.addEventListener("click", toggleAliasCreationView);
      }

      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        searchInput.addEventListener("input", (event) => {
          const target = event.target as HTMLInputElement;
          renderContent(target.value);
        });
      }

      addCopyToClipboardCapability();
      addDeletionCapability();
    } else {
      showLoginTemplate();
    }
  });
})();
