import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-verify-login',
  templateUrl: './verify-login.component.html',
  styleUrls: ['./verify-login.component.css']
})

export class VerifyLoginComponent implements AfterViewInit {
  inputs!: NodeListOf<HTMLInputElement>;
  button!: HTMLButtonElement;

  ngAfterViewInit(): void {
    this.inputs = document.querySelectorAll("input");
    this.button = document.querySelector("button") as HTMLButtonElement;

    const handleKeyUp = (event: KeyboardEvent) => {
      const currentInput = event.target as HTMLInputElement;
      const nextInput = currentInput.nextElementSibling as HTMLInputElement;
      const prevInput = currentInput.previousElementSibling as HTMLInputElement;

      if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
        nextInput.removeAttribute("disabled");
        nextInput.focus();
      }

      if (currentInput.value.length > 1) {
        currentInput.value = "";
        return;
      }

      const currentIndex = Array.from(this.inputs).indexOf(currentInput);

      if (event.key === "Backspace") {
        this.inputs.forEach((input, index2) => {
          if (currentIndex <= index2 && prevInput) {
            input.setAttribute("disabled", 'true');

            if (prevInput instanceof HTMLInputElement) {
              prevInput.focus();
            }
          }
        });
      }

      if (!this.inputs[5].disabled && this.inputs[5].value !== "") {
        this.button.classList.add("active");
      } else {
        this.button.classList.remove("active");
      }
    };

    this.inputs.forEach((input) => {
      input.addEventListener("keyup", handleKeyUp);
    });

    window.addEventListener("load", () => this.inputs[0].focus());
  }
}
