import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppModule] }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it("should render the welcome heading", () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector("h1")?.textContent).toContain(
      "Welcome to our Angular example app"
    );
  });

  it("should update the rendered count when an item is added", () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector<HTMLElement>('abds-button[icon-start="add"]')!.click();
    fixture.detectChanges();

    expect(compiled.querySelectorAll("#shopping-list li").length).toBe(1);
    expect(compiled.querySelector("abds-badge")?.textContent).toContain("Item count: 1");
  });

  it("should remove completed items and update the rendered count", () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const addButton = compiled.querySelector<HTMLElement>('abds-button[icon-start="add"]')!;

    addButton.click();
    addButton.click();
    compiled.querySelector("#shopping-list abds-checkbox")?.setAttribute("checked", "true");
    compiled.querySelector<HTMLElement>('abds-button[icon-start="subtract"]')!.click();
    fixture.detectChanges();

    expect(compiled.querySelectorAll("#shopping-list li").length).toBe(1);
    expect(compiled.querySelector("abds-badge")?.textContent).toContain("Item count: 1");
  });

  it("should update the text style when the toggle is clicked", () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector<HTMLElement>("section:nth-child(3) abds-switch");

    toggle?.click();
    fixture.detectChanges();
    expect(compiled.querySelector("section:nth-child(3) span")?.classList.contains("bg-black")).toBe(true);
  });
});
