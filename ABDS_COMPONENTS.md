# ABDS component reference

Reference for **`@abds/components` 3.4.3**, the version installed in this app.
This covers all **14 general components**, their **111 custom properties**, and
the **122 generated icon components** shipped in the package.

## Sources and scope

The source of truth is the published **`@abds/components@3.4.3`** package,
cross-checked against the local installation. Source links below point to
version-pinned copies on UNPKG, so they work when reading this document on GitHub
or without installing dependencies:

- [Compiled component metadata and implementations](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/).
- [Generated public TypeScript declarations](https://unpkg.com/@abds/components@3.4.3/dist/types/components.d.ts).
- [Bundled documentation metadata](https://unpkg.com/@abds/components@3.4.3/dist/components.json), used for descriptions and slot documentation.
- Component CSS in the collection directory, used for visual variations and limitations.

These links require internet access and depend on UNPKG availability. Pinning
`3.4.3` keeps them aligned with this reference rather than following `latest`.
For offline inspection after `yarn install`, the equivalent files are under
`node_modules/@abds/components/` with the same `dist/` paths. The component
reference itself is self-contained and does not require following these links.

The documentation metadata omits generated icons and methods marked internal,
so this reference also includes the methods exposed by the compiled components
and labels internal APIs.
Lifecycle hooks, private state, and ordinary inherited DOM properties are not
configuration props. No component in this release declares CSS shadow parts.

## Reading the tables

- **Property** is the JavaScript/Angular binding name; **HTML attribute** is its markup spelling.
- **Initial default** is the compiled property's initializer. **Unset** means no initializer,
  generally `undefined`; it does not imply `false`, an empty string, or a native-element default.
  Runtime fallbacks and lifecycle exceptions are called out separately.
- **Required** is the requirement in the component's TypeScript metadata. It does not
  mean the HTML parser rejects missing attributes, or that a form field is required.
  The `required` prop on a form control governs form validation separately.
- **Reflects** means changes to the property are reflected back to its host attribute.
  An attribute can still initialize a prop that does not reflect changes back.
- Quoted defaults such as `'base'` are string values; omit the quotes in HTML attributes.
- Finite values are case-sensitive. Free-form `string` props have no declared enum.
  Icon strings use the names in the [icon catalog](#icon-catalog).
- Variant axes can be combined, but not every combination has distinct styling.
  Button appearance limitations are noted in its section.

## Angular usage

The app already registers the custom elements through `defineCustomElements()` in
`src/main.ts` and enables `CUSTOM_ELEMENTS_SCHEMA` in its module. Static attributes
use kebab case; property bindings use the JavaScript name:

```html
<abds-input
  name="email"
  type="email"
  helper-text="Use your work email."
  [required]="true"
  [disabled]="isSaving"
  [value]="email"
  (abdsInput)="onEmailInput($event)"
>Email address</abds-input>

<abds-badge [iconStart]="statusIcon" palette="success">Saved</abds-badge>
```

Use boolean property bindings for dynamic state. To turn a static boolean off,
omit its attribute. Do not depend on native HTML boolean-attribute conventions to
describe Stencil's string-to-boolean coercion.

These are web components; this package does not supply Angular form value
accessors. Use properties and ABDS events to synchronize Angular state, or add an
adapter before using `ngModel` or reactive-form directives.

For the ABDS change/input events listed below, the package declares the detail
type as `any`, but the implementations call `.emit()` without a payload. Read
`value` or `checked` from the emitting element rather than assuming `event.detail.value`:

```ts
onEmailInput(event: Event): void {
  this.email = (event.target as HTMLAbdsInputElement).value;
}
```

Standard DOM events such as `click` remain available. Tables below list custom
ABDS events, not every inherited browser event. The form controls use hidden
native elements to participate in form submission/reset; provide their `name`
and `value` props as appropriate.

## Component index

| Component | Main variations |
| --- | --- |
| [`abds-badge`](#abds-badge) | 6 palettes; 2 sizes; auto/full width; leading/trailing icons |
| [`abds-button`](#abds-button) | 5 palettes; 3 appearances; auto/full width; link/button; disabled |
| [`abds-button-icon`](#abds-button-icon) | 3 palettes; 5 appearances; 3 sizes; link/button; disabled |
| [`abds-checkbox`](#abds-checkbox) | Start/end alignment; checked; indeterminate; disabled; required/error |
| [`abds-icon`](#abds-icon) | 122 icon names; 13 sizes; 4 stroke weights |
| [`abds-input`](#abds-input) | 12 input types; 8 input modes; default/full width; icons; validation/read-only/disabled |
| [`abds-label`](#abds-label) | 2 font weights; required indicator; tooltip |
| [`abds-modal`](#abds-modal) | 2 palettes; open/closed; optional header icon and footer |
| [`abds-radio`](#abds-radio) | Start/end alignment; checked; disabled; required; named groups |
| [`abds-select`](#abds-select) | Default/full width; placeholder; disabled; validation |
| [`abds-select-option`](#abds-select-option) | Selected; disabled; hidden; label/value fallbacks |
| [`abds-supporting-text`](#abds-supporting-text) | Helper text or error text |
| [`abds-switch`](#abds-switch) | Checked; disabled; optional label tooltip |
| [`abds-tooltip`](#abds-tooltip) | 4 placements; open/closed; explicit target or parent target |

[Generated icon components and full icon catalog](#generated-icon-components).

## abds-badge

**Variations:** 6 palettes; 2 sizes; auto/full width; leading/trailing icons.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/badge/badge.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `iconEnd` | `icon-end` | `string` | Unset | No | Yes | Adds an abds-icon to end of badge text. |
| `iconStart` | `icon-start` | `string` | Unset | No | Yes | Adds an abds-icon to beginning of badge text. |
| `palette` | `palette` | `basic`, `dark`, `error`, `light`, `success`, `warning` | `'basic'` | No | Yes | Sets badge color options. |
| `size` | `size` | `base`, `sm` | `'base'` | No | Yes | Sets height and padding of badge. |
| `width` | `width` | `auto`, `full` | `'auto'` | No | Yes | Sets badge width to auto fit content or full. |

### Palette variations

| Palette | Background | Text | Border |
| --- | --- | --- | --- |
| `basic` | Light gray (`#ededed`) | Dark (`#3b3b3b`) | None |
| `dark` | Dark gray (`#464646`) | White | None |
| `error` | Red (`#e22f00`) | White | None |
| `light` | White | Dark (`#3b3b3b`) | 1px solid gray (`#b5b5b5`) |
| `success` | Green (`#00dc8c`) | Dark (`#3b3b3b`) | None |
| `warning` | Yellow (`#faeb1e`) | Dark (`#3b3b3b`) | None |

These are shipped fallback colors; corresponding ABDS CSS custom properties can override them.

### Size variations

| Size / palette | Vertical padding | Horizontal padding |
| --- | --- | --- |
| `base`, non-light | `0.25rem` | `0.5rem` |
| `sm`, non-light | `0.0625rem` | `0.375rem` |
| `base`, light | `calc(0.25rem - 1px)` | `calc(0.5rem - 1px)` |
| `sm`, light | `0` | `calc(0.375rem - 1px)` |

The light palette subtracts its border width from padding. `width="full"` fills
the parent width. Icons can be supplied on either or both sides of the label.

### Slots

| Slot | Content |
| --- | --- |
| Default (unnamed) | Adds badge text. |

### Events

No custom ABDS events are declared.

### Methods

No custom methods are exposed.

### Example

```html
<abds-badge palette="warning">Pending</abds-badge>
<abds-badge palette="light" size="sm" icon-start="check-1">Ready</abds-badge>
<abds-badge palette="success" width="full" icon-end="check-1">Saved</abds-badge>
```

## abds-button

**Variations:** 5 palettes; 3 appearances; auto/full width; link/button; disabled.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/button/button.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `appearance` | `appearance` | `outline`, `solid`, `transparent` | `'solid'` | No | Yes | Provides an outlined appearance (i.e. solid border) to the button. Currently, only brand and destructive variants support outline. |
| `buttonType` | `button-type` | `string` | Unset | No | No | Native button behavior: button, reset, or submit. See the lifecycle caveat below. |
| `disabled` | `disabled` | `boolean` | `false` | No | Yes | Disables button interaction. |
| `formId` | `form-id` | `string` | Unset | No | No | Form ID associated with component. |
| `href` | `href` | `string` | Unset | No | Yes | Sets anchor href attribute; determines if component should render as anchor or button. |
| `iconEnd` | `icon-end` | `string` | Unset | No | Yes | Adds an abds-icon to end of button text. |
| `iconStart` | `icon-start` | `string` | Unset | No | Yes | Adds an abds-icon to beginning of button text. |
| `label` | `label` | `string` | Unset | No | No | Sets aria-label attribute on anchor or button. |
| `name` | `name` | `string` | Unset | No | No | Sets button name attribute. |
| `palette` | `palette` | `brand`, `destructive`, `inverse`, `neutral`, `success` | `'brand'` | No | Yes | Sets button color. |
| `rel` | `rel` | `string` | Unset | No | No | Sets anchor rel attribute. |
| `target` | `target` | `_blank`, `_parent`, `_self`, `_top` | `'_self'` | No | No | Sets anchor target attribute. |
| `width` | `width` | `auto`, `full` | `'auto'` | No | Yes | Sets button width. |

### Behavior and appearance limitations

Supplying `href` renders an anchor; otherwise the component renders a button.
Use `label` to set the inner element's accessible label, and supply `rel`/`target`
for links as needed. Leading and trailing icons are independent.

The package explicitly documents outline styling for `brand` and `destructive`.
Its compiled CSS also contains shared outline and transparent rules; do not assume
every palette/appearance combination is a separately designed variation.

**Button-type caveat in 3.4.3:** the prop comment claims a default of `button`,
but there is no initializer. The browser `componentWillLoad()` assigns `submit`
whenever the initial `buttonType !== ''`, including an initially unset value or
a supplied nonempty value. Rendering uses `buttonType || 'button'` as its fallback.
This discrepancy also means an initial `button-type="button"` can be overwritten.
When exact form behavior matters, set `buttonType` after `componentOnReady()` and
verify the rendered behavior. Use the **`button-type`** attribute / **`buttonType`**
property, rather than treating `type` as a supported ABDS prop.

### Slots

| Slot | Content |
| --- | --- |
| Default (unnamed) | Adds button text. |

### Events

No custom ABDS events are declared.

### Methods

| Method | Returns | Description | API status |
| --- | --- | --- | --- |
| `setFocus()` | `Promise<void>` | Sets focus on child element. | Public |

### Example

```html
<abds-button palette="brand">Save</abds-button>
<abds-button palette="destructive" appearance="outline">Delete</abds-button>
<abds-button href="/help" target="_blank" rel="noopener noreferrer"
  icon-end="arrow-right">Help</abds-button>
<abds-button palette="neutral" width="full" disabled>Unavailable</abds-button>
```

## abds-button-icon

**Variations:** 3 palettes; 5 appearances; 3 sizes; link/button; disabled.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/button-icon/button-icon.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `appearance` | `appearance` | `inline`, `solid`, `solid-outline`, `transparent`, `transparent-outline` | `'transparent'` | No | Yes | Sets appearance (e.g. solid-outline). |
| `disabled` | `disabled` | `boolean` | `false` | No | Yes | Prevents the user from interacting with the button, if passed. |
| `formId` | `form-id` | `string` | Unset | No | No | Associate button elements to forms with the same id. |
| `href` | `href` | `string` | Unset | No | Yes | Sets the URL that the hyperlink points to; Determines if component should render as anchor or button. |
| `icon` | `icon` | `string` | Unset | No | Yes | Sets abds-icon to be rendered. |
| `label` | `label` | `string` | Unset | No | No | Sets aria-label and title attribute. |
| `name` | `name` | `string` | Unset | No | No | The name of the button, submitted as a pair with the button's value as part of the form data, when that button is used to submit the form. |
| `palette` | `palette` | `basic`, `brand`, `inverse` | `'basic'` | No | Yes | Sets palette (e.g. brand). |
| `rel` | `rel` | `string` | Unset | No | No | The relationship of the linked `href` as space-separated link types. Will only apply if `href` is passed. |
| `size` | `size` | `lg`, `md`, `sm` | `'md'` | No | Yes | Sets size (e.g. lg). |
| `target` | `target` | `_blank`, `_parent`, `_self`, `_top` | `'_self'` | No | No | Sets where to display the linked `href`. Will only apply if `href` is passed. |
| `type` | `type` | `string` | Unset | No | Yes | Sets default behavior of the button. |

### Behavior and variations

`href` switches rendering to an anchor. `label` supplies both the inner
`aria-label` and `title`; provide it when the control has no visible text.
If `icon` is omitted, the default slot supplies custom content instead.
The icon sizes inside `sm`, `md`, and `lg` buttons are `md`, `xl`, and `2xl` respectively.

Although `type` has no prop initializer, the rendered button defaults to **`submit`**.
Set `type="button"` for an icon button that should not submit a form. Palettes,
appearances, sizes, and disabled state can be combined; appearances share some CSS rules.

### Slots

| Slot | Content |
| --- | --- |
| Default (unnamed) | Adds custom content. |

### Events

No custom ABDS events are declared.

### Methods

| Method | Returns | Description | API status |
| --- | --- | --- | --- |
| `setFocus()` | `Promise<void>` | Sets focus on child element. | Public |

### Example

```html
<abds-button-icon icon="add" label="Add item" type="button"
  palette="brand" appearance="solid" size="lg"></abds-button-icon>
<abds-button-icon icon="information-circle" label="Help" href="/help"
  appearance="transparent-outline" size="sm"></abds-button-icon>
```

## abds-checkbox

**Variations:** Start/end alignment; checked; indeterminate; disabled; required/error.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/checkbox/checkbox.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `name` | `name` | `string` | Unset | Yes | Yes | Sets name attribute. |
| `alignment` | `alignment` | `end`, `start` | `'start'` | No | Yes | Aligns input and label. |
| `checked` | `checked` | `boolean` | `false` | No | Yes | Sets checked state. |
| `disabled` | `disabled` | `boolean` | `false` | No | Yes | Disables checkbox interaction. |
| `error` | `error` | `boolean` | `false` | No | Yes | Sets error state. |
| `indeterminate` | `indeterminate` | `boolean` | `false` | No | Yes | Sets indeterminate state. |
| `required` | `required` | `boolean` | `false` | No | Yes | Sets required state. |
| `requiredMessage` | `required-message` | `string` | Unset | No | No | Sets custom error message for required state. |
| `tooltip` | `tooltip` | `string` | Unset | No | Yes | Sets tooltip text in embedded abds-label. |
| `value` | `value` | `string` | `'on'` | No | Yes | Form submission value if selected. Default for checked checkbox is **on**: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-value |

### State variations

`alignment="start"` places the control at the start; `end` changes its alignment
relative to the label. `checked`, `indeterminate`, `disabled`, `required`, and
`error` are independent state props. The mixed-state icon takes precedence when
`indeterminate` is true. `tooltip` belongs to the embedded label. Supply label
text in the default slot; `required-message` customizes required validation text.

### Slots

| Slot | Content |
| --- | --- |
| Default (unnamed) | Adds label text. |

### Events

| Event | When emitted | Detail | Bubbles | Composed | Cancelable |
| --- | --- | --- | --- | --- | --- |
| `abdsChange` | Fired when the element's value is changed. | Declared `any`; no payload emitted | Yes | Yes | Yes |

Cancelable describes the event flag; the implementations do not use cancellation to roll back the changed value.

### Methods

| Method | Returns | Description | API status |
| --- | --- | --- | --- |
| `setFocus()` | `Promise<void>` | Focuses the internal control. | Exposed, but tagged `@internal` upstream |

### Example

```html
<abds-checkbox name="terms" value="accepted" required>Accept terms</abds-checkbox>
<abds-checkbox name="all" indeterminate>Select all</abds-checkbox>
<abds-checkbox name="archived" checked disabled alignment="end">Archived</abds-checkbox>
```

## abds-icon

**Variations:** 122 icon names; 13 sizes; 4 stroke weights.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/icon/icon.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `icon` | `icon` | `string` | Unset | Yes | Yes | Sets abds-icon to display. |
| `size` | `size` | `2xl`, `2xs`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `base`, `lg`, `md`, `sm`, `xl`, `xs` | `'base'` | No | Yes | Sets icon size. |
| `strokeWidth` | `stroke-width` | `bold`, `medium`, `regular`, `semibold` | `'regular'` | No | Yes | Sets icon stroke-width. |

### Icon variations

Use the exact name in the [122-name catalog](#icon-catalog), without the
`abds-icon-` prefix. `size` accepts 13 typography size names and `stroke-width`
accepts 4 weights. The wrapper creates the matching generated component and passes
both size and stroke weight to it. Its default stroke weight is `regular`.
The generated SVGs use inherited color styling; apply a text-color class to the host.

### Slots

No rendered content slots.

### Events

No custom ABDS events are declared.

### Methods

No custom methods are exposed.

### Example

```html
<abds-icon icon="task-list-pen" size="2xl" stroke-width="bold"></abds-icon>
<abds-icon icon="check-1" size="sm" class="text-green-500"></abds-icon>
```

## abds-input

**Variations:** 12 input types; 8 input modes; default/full width; icons; validation/read-only/disabled.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/input/input.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `autocomplete` | `autocomplete` | [Autocomplete values](#autocomplete-values) | Unset | No | Yes | Hint for form autofill feature. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete |
| `interactiveButtonLabel` | `interactive-button-label` | `string` | Unset | No | Yes | Configurable label/title text for interactive button inside of input (search's clear button and password's mask button). |
| `disabled` | `disabled` | `boolean` | `false` | No | Yes | Disables input from interaction. |
| `error` | `error` | `boolean` | `false` | No | Yes | Allows setting error state. |
| `errorMessage` | `error-message` | `string` | Unset | No | Yes | Custom error message. Will only display if `error` prop is true. |
| `helperText` | `helper-text` | `string` | Unset | No | Yes | Text of the information message. |
| `hideIconEnd` | `hide-icon-end` | `boolean` | `false` | No | Yes | Hide icon-end, if present. |
| `hideIconStart` | `hide-icon-start` | `boolean` | `false` | No | Yes | Hide icon-start, if present. |
| `iconEnd` | `icon-end` | `string` | Unset | No | No | Adds an abds-icon to end of input. |
| `iconStart` | `icon-start` | `string` | Unset | No | No | Adds an abds-icon to beginning of input. |
| `inputmode` | `inputmode` | `decimal`, `email`, `none`, `numeric`, `search`, `tel`, `text`, `url` | Unset | No | Yes | Sets inputmode attribute for input |
| `max` | `max` | `string` | Unset | No | Yes | The maximum value, which must not be less than its minimum (min attribute) value. |
| `maxlength` | `maxlength` | `string` | Unset | No | Yes | This attribute specifies the maximum number of characters that the user can enter. |
| `min` | `min` | `string` | Unset | No | Yes | The minimum value, which must not be greater than its maximum (max attribute) value. |
| `minlength` | `minlength` | `string` | Unset | No | Yes | This attribute specifies the minimum number of characters that the user can enter. |
| `minlengthMessage` | `minlength-message` | `string` | Unset | No | No | Specifies a custom error message for invalid minLength. |
| `name` | `name` | `string` | Unset | Yes | Yes | The name of the control, which is submitted with the form data. |
| `pattern` | `pattern` | `string` | Unset | No | Yes | A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. |
| `patternMessage` | `pattern-message` | `string` | Unset | No | No | Specifies a custom error message for invalid pattern. |
| `placeholder` | `placeholder` | `string` | Unset | No | Yes | Instructional text that shows before the input has a value. |
| `readonly` | `readonly` | `boolean` | `false` | No | Yes | When set to true, it makes the input not mutable. |
| `required` | `required` | `boolean` | `false` | No | Yes | Specifies required state for form submission. |
| `requiredMessage` | `required-message` | `string` | Unset | No | No | Specifies a custom error message for required state. |
| `tooltip` | `tooltip` | `string` | Unset | No | Yes | The tooltip text to be passed to label. |
| `type` | `type` | `date`, `datetime-local`, `email`, `month`, `number`, `password`, `search`, `tel`, `text`, `time`, `url`, `week` | `'text'` | No | Yes | Specify the input type. |
| `value` | `value` | `string` | Unset | No | Yes | The value of the input. |
| `width` | `width` | `default`, `full` | `'default'` | No | Yes | Sets input width. |

### Input variations

All 12 `type` values and all 8 `inputmode` values are enumerated above. Numeric
constraints (`min`, `max`, `minlength`, `maxlength`) are **string props** in this
release, even though their contents represent numbers.

- `type="search"` supports an interactive clear button.
- `type="password"` supports an interactive mask/reveal button.
- `interactive-button-label` supplies the accessible text for that interactive button.
- `icon-start` and `icon-end` add decorations; `hide-icon-start` and `hide-icon-end` hide them.
- `helper-text` supplies guidance; `error` plus `error-message` supplies an explicit error.
- `required`, `pattern`, and `minlength` have corresponding custom-message props.
- `readonly` keeps the value immutable; `disabled` prevents interaction.
- `width="full"` fills the parent width; `default` uses the component's normal width.

The default slot supplies label text. Use `abdsInput` for changes as the user types
and `abdsChange` for committed changes. See the complete [autocomplete values](#autocomplete-values).

### Slots

| Slot | Content |
| --- | --- |
| Default (unnamed) | Adds label text. |

### Events

| Event | When emitted | Detail | Bubbles | Composed | Cancelable |
| --- | --- | --- | --- | --- | --- |
| `abdsChange` | Fired only when value is committed (e.g. pressing the enter key). | Declared `any`; no payload emitted | Yes | Yes | Yes |
| `abdsInput` | Fired every time value changes. | Declared `any`; no payload emitted | Yes | Yes | Yes |

Cancelable describes the event flag; the implementations do not use cancellation to roll back the changed value.

### Methods

| Method | Returns | Description | API status |
| --- | --- | --- | --- |
| `setFocus()` | `Promise<void>` | Focuses the internal control. | Exposed, but tagged `@internal` upstream |

### Example

```html
<abds-input name="email" type="email" autocomplete="email"
  placeholder="you@example.com" helper-text="Use your work email." required>Email</abds-input>
<abds-input name="search" type="search" width="full"
  interactive-button-label="Clear search">Search</abds-input>
<abds-input name="password" type="password" minlength="12"
  minlength-message="Enter at least 12 characters.">Password</abds-input>
<abds-input name="code" error error-message="Code not recognized."
  icon-start="alert-circle">Code</abds-input>
```

## abds-label

**Variations:** 2 font weights; required indicator; tooltip.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/label/label.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `required` | `required` | `boolean` | `false` | No | Yes | Displays red asterisk if true. Has no impact on form submission. **Note:** A required label without text will display a red asterisk with no context. To prevent this the implementation should not render the label at all if no text is present to display. |
| `tooltip` | `tooltip` | `string` | Unset | No | Yes | Tooltip text to display on abds-icon hover. |
| `weight` | `weight` | `medium`, `semibold` | `'semibold'` | No | Yes | Displays label in bold or medium font-weight. |

### Label variations

`weight="semibold"` is the default; `medium` is the lighter supported weight.
`required` adds a red asterisk and does not itself require a form control's value.
Avoid rendering a required label without label text: it otherwise presents an
asterisk without context. `tooltip` adds help text on the label's help icon.

### Slots

| Slot | Content |
| --- | --- |
| Default (unnamed) | Adds label text. |

### Events

No custom ABDS events are declared.

### Methods

No custom methods are exposed.

### Example

```html
<abds-label required tooltip="Use your legal name.">Full name</abds-label>
<abds-label weight="medium">Optional note</abds-label>
```

## abds-modal

**Variations:** 2 palettes; open/closed; optional header icon and footer.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/modal/modal.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `headerText` | `header-text` | `string` | Unset | No | No | Sets header text. |
| `icon` | `icon` | `string` | Unset | No | Yes | Adds an abds-icon on left side of header text. |
| `open` | `open` | `boolean` | `false` | No | Yes | Sets open/closed state. |
| `palette` | `palette` | `basic`, `danger` | `'basic'` | No | Yes | Sets header text color. |

### Modal variations and slots

`basic` uses the normal header styling; `danger` applies the danger text treatment
to the header. `icon` is optional and appears before the header text.
`open` controls visibility. The built-in close button and Escape handler close it.

The header is configured by **`header-text`**, not a `modal-header` slot.
Only **`modal-body`** and **`modal-footer`** are rendered as slots. Unnamed content
and `slot="modal-header"` are not projected. The footer wrapper is initialized
based on whether footer content is present when the component loads.
There is no declared custom close event; synchronize application state deliberately
when controlling `open` through Angular.

### Slots

| Slot | Content |
| --- | --- |
| `modal-body` | Adds body content. |
| `modal-footer` | Adds footer content. |

### Events

No custom ABDS events are declared.

### Methods

No custom methods are exposed.

### Example

```html
<abds-modal header-text="Delete item?" palette="danger"
  icon="alert-triangle" [open]="confirmOpen">
  <p slot="modal-body">This action cannot be undone.</p>
  <div slot="modal-footer">
    <abds-button (click)="confirmOpen = false">Cancel</abds-button>
  </div>
</abds-modal>
```

## abds-radio

**Variations:** Start/end alignment; checked; disabled; required; named groups.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/radio/radio.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `name` | `name` | `string` | Unset | Yes | Yes | Sets name attribute. |
| `value` | `value` | `string` | Unset | Yes | Yes | Form submission value if selected. |
| `alignment` | `alignment` | `end`, `start` | `'start'` | No | Yes | Aligns input and label. |
| `checked` | `checked` | `boolean` | `false` | No | Yes | Sets checked state. |
| `disabled` | `disabled` | `boolean` | `false` | No | Yes | Disables radio interaction. |
| `required` | `required` | `boolean` | `false` | No | Yes | Sets required state. |
| `tooltip` | `tooltip` | `string` | Unset | No | Yes | Sets tooltip text in embedded abds-label. |

### Radio variations

Use the same `name` for alternatives in a group and distinct `value` strings.
`checked` initializes or updates selection. `alignment` controls label/control
alignment; `disabled`, `required`, and the embedded-label `tooltip` supply the
other supported states. Supply visible label content in the default slot.

### Slots

| Slot | Content |
| --- | --- |
| Default (unnamed) | Adds label text. |

### Events

| Event | When emitted | Detail | Bubbles | Composed | Cancelable |
| --- | --- | --- | --- | --- | --- |
| `abdsChange` | Fired when the element's value is changed. | Declared `any`; no payload emitted | Yes | Yes | Yes |

Cancelable describes the event flag; the implementations do not use cancellation to roll back the changed value.

### Methods

| Method | Returns | Description | API status |
| --- | --- | --- | --- |
| `setBlur()` | `Promise<void>` | Blurs the internal control. | Exposed, but tagged `@internal` upstream |
| `setFocus()` | `Promise<void>` | Focuses the internal control. | Exposed, but tagged `@internal` upstream |

### Example

```html
<abds-radio name="fruit" value="apple" checked>Apple</abds-radio>
<abds-radio name="fruit" value="banana">Banana</abds-radio>
<abds-radio name="fruit" value="cherry" disabled>Cherry</abds-radio>
```

## abds-select

**Variations:** Default/full width; placeholder; disabled; validation.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/select/select.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` | No | Yes | Disables select interaction. |
| `error` | `error` | `boolean` | `false` | No | Yes | Allows setting error state. |
| `errorMessage` | `error-message` | `string` | Unset | No | Yes | Custom error message. |
| `helperText` | `helper-text` | `string` | Unset | No | Yes | Text of the information message. |
| `label` | `label` | `string` | Unset | No | Yes | Sets label text in embedded abds-label. |
| `name` | `name` | `string` | Unset | Yes | Yes | Sets name attribute. |
| `placeholder` | `placeholder` | `string` | Unset | No | Yes | Optional placeholder text. |
| `required` | `required` | `boolean` | `false` | No | Yes | Sets required state. |
| `requiredMessage` | `required-message` | `string` | Unset | No | Yes | Specifies a custom error message for required state. |
| `tooltip` | `tooltip` | `string` | Unset | No | Yes | Sets tooltip text in embedded abds-label. |
| `value` | `value` | `string` | Unset | No | Yes | Current selected value, submitted with the form. Option values fall back to their text when omitted. |
| `width` | `width` | `default`, `full` | `'default'` | No | Yes | Sets select width to default size or full. |

### Select variations

Place `abds-select-option` children inside the select. Although this component has
no rendered default `<slot>`, its implementation reads those child elements and
creates native select options. `label` is a prop here, rather than slotted label text.

`placeholder` adds an initial disabled/hidden placeholder option. `width="full"`
fills the parent width. `error`, `error-message`, `helper-text`, `required`,
`required-message`, and `disabled` control guidance, validation, and interaction.
This release exposes a single-selection control; it has no `multiple` prop.

### Slots

No rendered content slots.

### Events

| Event | When emitted | Detail | Bubbles | Composed | Cancelable |
| --- | --- | --- | --- | --- | --- |
| `abdsChange` | Fired only when value is committed (e.g. pressing the enter key). | Declared `any`; no payload emitted | Yes | Yes | Yes |

Cancelable describes the event flag; the implementations do not use cancellation to roll back the changed value.

### Methods

No custom methods are exposed.

### Example

```html
<abds-select name="fruit" label="Favorite fruit" placeholder="Choose a fruit"
  width="full" required>
  <abds-select-option value="apple">Apple</abds-select-option>
  <abds-select-option value="banana">Banana</abds-select-option>
  <abds-select-option value="cherry" disabled>Cherry</abds-select-option>
</abds-select>
```

## abds-select-option

**Variations:** Selected; disabled; hidden; label/value fallbacks.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/select-option/select-option.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | Unset | No | Yes | If this Boolean attribute is set, this option is not checkable. Often browsers grey out such control and it won't receive any browsing event, like mouse clicks or focus-related ones. |
| `hidden` | `hidden` | `boolean` | Unset | No | Yes | If present, the option will be hidden from view. This can be useful for options such as placeholder that would never be selectable and we want to hide from the visual dropdown. |
| `label` | `label` | `string` | Unset | No | Yes | This attribute is text for the label indicating the meaning of the option. If the label attribute isn't defined, its value is that of the element text content. |
| `selected` | `selected` | `boolean` | Unset | No | Yes | If present, this Boolean attribute indicates the option is initially selected. Only one single abds-select-option of an abds-select element may have the selected attribute. |
| `value` | `value` | `string` | Unset | No | Yes | The content of this attribute represents the value to be submitted with the form, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element. |

### Option variations

Use within `abds-select`. Only one option should initially have `selected`.
`disabled` prevents selecting an option; `hidden` hides it from the visual dropdown.
If `label` is omitted, text content supplies the label. If `value` is omitted,
text content supplies the value. Boolean props are initially unset in the compiled
metadata, so absence should not be documented as an explicit `false` initializer.

### Slots

| Slot | Content |
| --- | --- |
| Default (unnamed) | Option text/label. |

### Events

No custom ABDS events are declared.

### Methods

No custom methods are exposed.

### Example

```html
<abds-select name="priority" label="Priority">
  <abds-select-option value="normal" selected>Normal</abds-select-option>
  <abds-select-option value="urgent" label="Urgent">Urgent</abds-select-option>
  <abds-select-option value="legacy" hidden>Legacy</abds-select-option>
</abds-select>
```

## abds-supporting-text

**Variations:** Helper text or error text.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/supporting-text/supporting-text.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `errorText` | `error-text` | `string` | Unset | No | Yes | Error message text. **Note:** Error text will always override helper text. |
| `helperText` | `helper-text` | `string` | Unset | No | Yes | Helper/informational message text. |

### Message variations

`helper-text` renders guidance. `error-text` takes precedence if both are provided.
Use the props to supply text; this component does not render a content slot.
There is no separate palette or size prop.

### Slots

No rendered content slots.

### Events

No custom ABDS events are declared.

### Methods

No custom methods are exposed.

### Example

```html
<abds-supporting-text helper-text="Maximum 100 characters."></abds-supporting-text>
<abds-supporting-text error-text="This field is required."></abds-supporting-text>
```

## abds-switch

**Variations:** Checked; disabled; optional label tooltip.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/switch/switch.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `name` | `name` | `string` | Unset | Yes | Yes | Sets name attribute. |
| `checked` | `checked` | `boolean` | `false` | No | Yes | Sets checked state. |
| `disabled` | `disabled` | `boolean` | `false` | No | Yes | Disables switch interaction. |
| `tooltip` | `tooltip` | `string` | Unset | No | Yes | Sets tooltip text in embedded abds-label. |
| `value` | `value` | `string` | `'on'` | No | Yes | Form submission value when the switch is checked. |

### Switch variations

`checked` controls on/off state and `disabled` prevents interaction. The default
slot supplies the label, and `tooltip` supplies embedded-label help text.
The submitted value defaults to `'on'`; there are no `required`, `error`, `size`,
or `palette` props on the switch in this version.

### Slots

| Slot | Content |
| --- | --- |
| Default (unnamed) | Adds label text. |

### Events

| Event | When emitted | Detail | Bubbles | Composed | Cancelable |
| --- | --- | --- | --- | --- | --- |
| `abdsChange` | Fired when the element's value is changed. | Declared `any`; no payload emitted | Yes | Yes | Yes |

Cancelable describes the event flag; the implementations do not use cancellation to roll back the changed value.

### Methods

| Method | Returns | Description | API status |
| --- | --- | --- | --- |
| `setFocus()` | `Promise<void>` | Sets focus on native `input` in `abds-switch`. | Public |

### Example

```html
<abds-switch name="notifications" value="enabled" checked
  tooltip="Receive email updates.">Notifications</abds-switch>
<abds-switch name="locked-setting" disabled>Locked setting</abds-switch>
```

## abds-tooltip

**Variations:** 4 placements; open/closed; explicit target or parent target.

[Compiled definition](https://unpkg.com/@abds/components@3.4.3/dist/collection/components/tooltip/tooltip.js) · Encapsulation: `shadow`.

### Props

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `for` | `for` | `string` | Unset | No | Yes | ID selector to attach tooltip to. If unset Tooltip will try to attach to parent element. |
| `open` | `open` | `boolean` | `false` | No | Yes | Determines Tooltip visibility. |
| `placement` | `placement` | `bottom`, `left`, `right`, `top` | `'top'` | No | Yes | Sets tooltip placement in relation to reference element. |

### Placement and visibility variations

Only `top`, `right`, `bottom`, and `left` are supported. The component does not
declare `top-start`, `right-end`, or other aligned Floating UI placements.
`for` takes an element **ID without `#`**. When omitted, the parent is the target;
the implementation also falls back to the parent if the ID is not found.
Hover/focus shows it, blur/mouseleave hides it, and Escape closes it.
`open` can also make it visible explicitly. Content goes in the default slot.

ABDS creates the visual gap using `0.75rem` padding on the tooltip host.
See the [Tailwind compatibility rules](#tailwind-v4-compatibility).

### Slots

| Slot | Content |
| --- | --- |
| Default (unnamed) | Tooltip text. |

### Events

No custom ABDS events are declared.

### Methods

No custom methods are exposed.

### Example

```html
<button id="help-trigger" type="button">Help</button>
<abds-tooltip for="help-trigger" placement="right">More information</abds-tooltip>

<span tabindex="0">
  Hover or focus here
  <abds-tooltip placement="bottom">Targets its parent.</abds-tooltip>
</span>
```

## Autocomplete values

The `autocomplete` prop on `abds-input` accepts these 54 distinct string values
from the installed declaration (the upstream type repeats `cc-family-name`,
listed only once here):

- `additional-name`, `address-level1`, `address-level2`, `address-level3`, `address-level4`, `address-line1`
- `address-line2`, `address-line3`, `bday`, `bday-day`, `bday-month`, `bday-year`
- `cc-additional-name`, `cc-csc`, `cc-exp`, `cc-exp-month`, `cc-exp-year`, `cc-family-name`
- `cc-given-name`, `cc-name`, `cc-number`, `cc-type`, `country`, `country-name`
- `current-password`, `email`, `family-name`, `given-name`, `honorific-prefix`, `honorific-suffix`
- `impp`, `language`, `name`, `new-password`, `nickname`, `off`
- `on`, `one-time-code`, `organization`, `organization-title`, `photo`, `postal-code`
- `sex`, `street-address`, `tel`, `tel-area-code`, `tel-country-code`, `tel-extension`
- `tel-local`, `tel-national`, `transaction-amount`, `transaction-currency`, `url`, `username`

## Generated icon components

The 122 generated `abds-icon-*` elements are tagged **`@internal`** by ABDS.
Prefer the public `abds-icon` wrapper, or the `icon`, `icon-start`, and `icon-end`
props offered by other components. Every generated icon has the same two props:

| Property | HTML attribute | Type / allowed values | Initial default | Required | Reflects | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `size` | `size` | `2xl`, `2xs`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `base`, `lg`, `md`, `sm`, `xl`, `xs` | `'base'` | No | Yes | The size of the icon, defaults to "base" icon dimensions follow typography sizes defined in tailwind.typography.default. |
| `strokeWidth` | `stroke-width` | `bold`, `medium`, `regular`, `semibold` | Unset | No | Yes | the stroke width of the icon |

`size` defaults to `'base'`. A generated icon has no `strokeWidth` initializer;
the public wrapper supplies its own default of `'regular'`.
Generated icons use **scoped CSS**, whereas the 14 general components use shadow DOM.
They declare no custom events, methods, content slots, or CSS parts.

```html
<!-- Preferred public interface -->
<abds-icon icon="add" size="lg" stroke-width="bold"></abds-icon>

<!-- Corresponding generated internal component -->
<abds-icon-add size="lg" stroke-width="bold"></abds-icon-add>
```

### Icon dimensions and stroke variations

The generated icons' shared stylesheet maps size names to these font sizes.
Pixel equivalents assume a 16px root font size.

| Size | Font size | Pixels at 16px root |
| --- | --- | --- |
| `2xs` | `0.75rem` | 12 |
| `xs` | `0.8125rem` | 13 |
| `sm` | `0.875rem` | 14 |
| `md` | `1rem` | 16 |
| `base` | `1rem` | 16 |
| `lg` | `1.125rem` | 18 |
| `xl` | `1.25rem` | 20 |
| `2xl` | `1.5rem` | 24 |
| `3xl` | `2rem` | 32 |
| `4xl` | `2.5rem` | 40 |
| `5xl` | `3rem` | 48 |
| `6xl` | `3.5rem` | 56 |
| `7xl` | `4rem` | 64 |

| Stroke weight | CSS `stroke-width` | Declared prop value |
| --- | --- | --- |
| `regular` | 1.5 | Yes |
| `medium` | 2 | Yes |
| `semibold` | 2.4 | Yes |
| `bold` | 2.8 | Yes |
| `extrabold` | 3.2 | No; CSS selector only |
| `2xbold` | 3.6 | No; CSS selector only |
| `3xbold` | 4 | No; CSS selector only |

The last three weights exist in the shipped CSS but are absent from the
TypeScript `StrokeWidth` union. They are implementation-only variations, not
declared supported API values. Prefer the four declared weights for typed bindings.

[Shared icon stylesheet](https://unpkg.com/@abds/components@3.4.3/dist/collection/assets/styles/abds-icon-common.css).

### Icon catalog

Every name below is backed by a generated component in the installed collection.
The left column is the value for `icon`, `icon-start`, or `icon-end`; the right
column is the internal custom-element tag. SVG filenames not present in this
catalog are not automatically registered components.

| Icon name | Generated element |
| --- | --- |
| `accounting-document` | `abds-icon-accounting-document` |
| `add` | `abds-icon-add` |
| `alarm-bell` | `abds-icon-alarm-bell` |
| `alarm-bell-off` | `abds-icon-alarm-bell-off` |
| `alarm-clock` | `abds-icon-alarm-clock` |
| `alert-circle` | `abds-icon-alert-circle` |
| `alert-triangle` | `abds-icon-alert-triangle` |
| `answer-machine` | `abds-icon-answer-machine` |
| `answer-machine-paper` | `abds-icon-answer-machine-paper` |
| `app-window-clock` | `abds-icon-app-window-clock` |
| `app-window-edit` | `abds-icon-app-window-edit` |
| `app-window-graph-1` | `abds-icon-app-window-graph-1` |
| `app-window-layout` | `abds-icon-app-window-layout` |
| `app-window-question` | `abds-icon-app-window-question` |
| `app-window-search-1` | `abds-icon-app-window-search-1` |
| `arrow-down` | `abds-icon-arrow-down` |
| `arrow-down-1` | `abds-icon-arrow-down-1` |
| `arrow-left` | `abds-icon-arrow-left` |
| `arrow-left-1` | `abds-icon-arrow-left-1` |
| `arrow-right` | `abds-icon-arrow-right` |
| `arrow-right-1` | `abds-icon-arrow-right-1` |
| `arrow-up` | `abds-icon-arrow-up` |
| `arrow-up-1` | `abds-icon-arrow-up-1` |
| `barcode-scan` | `abds-icon-barcode-scan` |
| `bin-1` | `abds-icon-bin-1` |
| `book-edit` | `abds-icon-book-edit` |
| `browser-gauge` | `abds-icon-browser-gauge` |
| `calendar` | `abds-icon-calendar` |
| `calendar-check` | `abds-icon-calendar-check` |
| `cash-payment-coins` | `abds-icon-cash-payment-coins` |
| `check-1` | `abds-icon-check-1` |
| `check-2` | `abds-icon-check-2` |
| `check-circle-1` | `abds-icon-check-circle-1` |
| `common-file-add` | `abds-icon-common-file-add` |
| `common-file-double-2` | `abds-icon-common-file-double-2` |
| `common-file-empty` | `abds-icon-common-file-empty` |
| `common-file-module-1` | `abds-icon-common-file-module-1` |
| `common-file-remove` | `abds-icon-common-file-remove` |
| `common-file-text` | `abds-icon-common-file-text` |
| `common-file-text-edit` | `abds-icon-common-file-text-edit` |
| `common-file-text-shield` | `abds-icon-common-file-text-shield` |
| `data-file-bars-cash` | `abds-icon-data-file-bars-cash` |
| `data-transfer-square-horizontal` | `abds-icon-data-transfer-square-horizontal` |
| `database-2` | `abds-icon-database-2` |
| `database-add` | `abds-icon-database-add` |
| `delete` | `abds-icon-delete` |
| `delivery-truck-2` | `abds-icon-delivery-truck-2` |
| `desktop-computer-1` | `abds-icon-desktop-computer-1` |
| `download-bottom` | `abds-icon-download-bottom` |
| `drugs-pills-box` | `abds-icon-drugs-pills-box` |
| `earth-1` | `abds-icon-earth-1` |
| `earth-cash` | `abds-icon-earth-cash` |
| `earth-question` | `abds-icon-earth-question` |
| `earth-search` | `abds-icon-earth-search` |
| `file-code-sync` | `abds-icon-file-code-sync` |
| `file-sql` | `abds-icon-file-sql` |
| `filter-1` | `abds-icon-filter-1` |
| `floppy-disk` | `abds-icon-floppy-disk` |
| `information-circle` | `abds-icon-information-circle` |
| `keyboard` | `abds-icon-keyboard` |
| `keyboard-wireless` | `abds-icon-keyboard-wireless` |
| `laptop-1` | `abds-icon-laptop-1` |
| `laptop-1-b` | `abds-icon-laptop-1-b` |
| `layout-module` | `abds-icon-layout-module` |
| `legal-hammer` | `abds-icon-legal-hammer` |
| `legal-scale-1` | `abds-icon-legal-scale-1` |
| `light-bulb-shine` | `abds-icon-light-bulb-shine` |
| `list-bullets` | `abds-icon-list-bullets` |
| `login-3` | `abds-icon-login-3` |
| `logout-2` | `abds-icon-logout-2` |
| `meeting-camera` | `abds-icon-meeting-camera` |
| `meeting-team-monitor-1` | `abds-icon-meeting-team-monitor-1` |
| `megaphone` | `abds-icon-megaphone` |
| `messages-bubble-square-text` | `abds-icon-messages-bubble-square-text` |
| `mobile-phone` | `abds-icon-mobile-phone` |
| `monitor-graph` | `abds-icon-monitor-graph` |
| `multiple-users-1` | `abds-icon-multiple-users-1` |
| `navigation-menu` | `abds-icon-navigation-menu` |
| `navigation-menu-horizontal` | `abds-icon-navigation-menu-horizontal` |
| `navigation-menu-vertical` | `abds-icon-navigation-menu-vertical` |
| `notes-add` | `abds-icon-notes-add` |
| `notes-paper` | `abds-icon-notes-paper` |
| `office-file-pdf` | `abds-icon-office-file-pdf` |
| `password-lock-1` | `abds-icon-password-lock-1` |
| `pencil-1` | `abds-icon-pencil-1` |
| `pets-paw` | `abds-icon-pets-paw` |
| `phone-action-warning` | `abds-icon-phone-action-warning` |
| `phone-hand-hold-1` | `abds-icon-phone-hand-hold-1` |
| `pill` | `abds-icon-pill` |
| `pill-clock` | `abds-icon-pill-clock` |
| `pin` | `abds-icon-pin` |
| `power-button` | `abds-icon-power-button` |
| `presentation-speaker` | `abds-icon-presentation-speaker` |
| `print-text` | `abds-icon-print-text` |
| `question-circle` | `abds-icon-question-circle` |
| `read-email-at` | `abds-icon-read-email-at` |
| `remove` | `abds-icon-remove` |
| `screen-1` | `abds-icon-screen-1` |
| `search` | `abds-icon-search` |
| `share` | `abds-icon-share` |
| `shipment-monitor-track` | `abds-icon-shipment-monitor-track` |
| `shipment-next` | `abds-icon-shipment-next` |
| `shipment-upload` | `abds-icon-shipment-upload` |
| `shopping-cart-1` | `abds-icon-shopping-cart-1` |
| `single-neutral-actions-money` | `abds-icon-single-neutral-actions-money` |
| `single-neutral-actions-text` | `abds-icon-single-neutral-actions-text` |
| `single-neutral-circle` | `abds-icon-single-neutral-circle` |
| `stopwatch` | `abds-icon-stopwatch` |
| `subtract` | `abds-icon-subtract` |
| `subtract-circle` | `abds-icon-subtract-circle` |
| `synchronize-arrow` | `abds-icon-synchronize-arrow` |
| `synchronize-arrow-1` | `abds-icon-synchronize-arrow-1` |
| `task-list-pen` | `abds-icon-task-list-pen` |
| `temperature-snowflake` | `abds-icon-temperature-snowflake` |
| `ticket` | `abds-icon-ticket` |
| `time-clock-circle` | `abds-icon-time-clock-circle` |
| `upload-bottom` | `abds-icon-upload-bottom` |
| `user-logout` | `abds-icon-user-logout` |
| `video-meeting-skype` | `abds-icon-video-meeting-skype` |
| `view-1` | `abds-icon-view-1` |
| `view-off` | `abds-icon-view-off` |
| `warehouse-packages` | `abds-icon-warehouse-packages` |

## Calling exposed methods

Wait for the lazy component to be ready before calling its methods:

```ts
const control = document.querySelector<HTMLAbdsInputElement>('abds-input[name="email"]');
if (control) {
  await customElements.whenDefined('abds-input');
  await control.componentOnReady();
  await control.setFocus();
}
```

Methods marked `@internal` above are exposed in this release but omitted from
the package's public documentation metadata; treat them as version-specific APIs.
`componentOnReady()` is a Stencil loader method, not a custom prop.

## Tailwind v4 compatibility

Keep the normal Tailwind import and preserve the ABDS host padding and badge border
in the same `base` layer as Preflight. The app's [stylesheet](src/styles.css) uses:

```css
@import "tailwindcss";

@layer base {
  abds-badge,
  abds-tooltip {
    padding: revert-layer;
  }

  abds-badge {
    border: revert-layer;
  }
}
```

This rolls back these specific Preflight declarations, allowing ABDS's host styles
to supply padding and borders, including badge size/palette variations. Utilities
remain in a later layer and can override them. Keep these rules in `base`;
placing `revert-layer` in a later layer would leave the earlier Preflight reset intact.
Other elements retain Preflight. This is not a blanket exemption of every component
or every property from Tailwind.

## Version-specific limitations

- All prop defaults and supported strings above describe **3.4.3** only. Recheck
  metadata and implementation when upgrading ABDS.
- CSS selectors target custom-element hosts from the document. Utilities on a
  host do not automatically style arbitrary descendants in its shadow DOM.
- There are no declared CSS parts for `::part(...)` customization in this version.
- A `palette` prop does not exist on every component. For example, the switch and
  tooltip have none; the badge's `error` palette and modal's `danger` palette use
  different names.
- `width` uses `auto`/`full` for badges and buttons, but `default`/`full` for inputs
  and selects. `size` names also vary by component.
- `label` is a prop for icon buttons and selects, while ordinary label content for
  inputs, radios, checkboxes, switches, badges, and text buttons is slotted.
