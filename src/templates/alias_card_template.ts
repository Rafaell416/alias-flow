import { Alias } from "../types/Alias";

export const createAliasCard = (item: Alias) => `
  <div class="card">
    <p class="email">${item.alias}</p>
    <div class="icons">
      <button class="clipboard-icon icon-button" data-alias="${item.alias}">
        <img src="assets/clipboard.svg" class="icon"/>
      </button>
      <button class="delete-icon icon-button" data-labelId="${item.id}" data-alias="${item.alias}">
        <img src="assets/delete.svg" class="icon"/>
      </button>
    </div>
  </div>
`;