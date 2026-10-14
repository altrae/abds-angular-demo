import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { Components } from "@abds/components";

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: "app-root",
  standalone: false,
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html"
})
export class AppComponent {
  darkMode = false;
  itemCount = 0;
  paragraphs: string[] = [];

  addListItem() {
    const shoppingList = document.querySelector("#shopping-list");
    const shoppingListItem = document.createElement("li");

    shoppingListItem.innerHTML = `
      <div class="flex gap-x-2 items-center">
        <abds-checkbox></abds-checkbox>
        <abds-input placeholder="enter text here"></abds-input>
      </div>
    `;

    shoppingList?.appendChild(shoppingListItem);
    this.itemCount += 1;
  }

  generateParagraphs = (count: number) =>
    Array.from(
      { length: count },
      (_, index) => `
          <span class="font-bold">#${index + 1}</span> Lorem ipsum dolor <a href="#">sit amet</a>, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
    );

  resetItems() {
    let checkboxes = document.querySelectorAll(
      "#shopping-list abds-checkbox[checked]"
    );

    if (checkboxes.length) {
      this.itemCount -= checkboxes.length;

      for (let checkbox of checkboxes) {
        const checkboxParent = checkbox.parentElement;

        checkboxParent?.remove();
      }
    }
  }

  setDarkMode = () => {
    this.darkMode = !this.darkMode;
  };

  toggleModal() {
    const modalElement = document.querySelector<HTMLElement & Components.AbdsModal>(
      "#modal-1"
    );
    const currentState = modalElement?.open;

    modalElement?.setAttribute("open", `${!currentState}`);
  }
}
