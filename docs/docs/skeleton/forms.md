---
id: skeleton_forms
title: Forms
sidebar_label: Forms
---

We use [react-final-form](https://final-form.org/react) to handle form state. To connect your React component with final form we recommend to use [withFinalForm](/bones/docs/resources/resource_withFinalForm) HOC that includes some common code to work with REST API and form elements.

To make form's javascript code more reusable you can use `common/forms` folder and put all standend inputs there.

## ~~BaseFieldHOC~~

Is HOC to wrap your input with react-final-form. This function will wrap input component with [Field](https://final-form.org/docs/react-final-form/api/Field) component to pass all props from react-final-form. And additionally wrap input with BaseFieldLayout. 

## ~~BaseFieldLayout~~

Mostly all yout inputs will have same layout to wrap input element with label, define some accessibility props, show lable, errors, is required, show some additional html elements such as [InputAdornment](https://material-ui.com/api/input-adornment/), ext... To avoid same code and make all form elements more reusable you should use BaseFieldLayout that is part of BaseFieldHOC and defines all html elements that are common for whatever input component.

## ~~inputs~~

Now all props to input is already defined with BaseFieldHOC and all additional html element are defined with BaseFieldLayout and everything is left to create input compnent. All input component it is better to store in `inputs` folder. Input component now should not contain any dublicate code and should be simple as much as it could be)


```jsx
export default function TextInput({ onChange, inputClassName, ...props }) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])
  return (
    <input
      {...props}
      className={inputClassName}
      onChange={handleChange}
    />
  )
}
```

## ~~fields.js~~

Now when you have your input component you just need to wrap this Component with BaseFieldHOC. And this should be done in `fields.js` file. 

```javascript
import TextInput from './inputs/TextInput'

const TextField = BaseFieldHOC(TextInput)

export {
  TextField
}
```

:::caution

Please, pay attantion that input Component shout have name `<type>Input` and field `<type>Field`

:::

## ~~validation~~

Based on react-final-form API you can use [form level validation](https://final-form.org/docs/react-final-form/examples/record-level-validation) and [fiels level validation](https://final-form.org/docs/react-final-form/examples/field-level-validation). Skeleton includes basic examples of validations. You can find this solution in 'common/form/validation' folder.

### ~~form level validation~~

```javascript
import { validateEmail, validateRequired, compose } from 'common/forms/validation'

export default compose(
  validateEmail('email'),
  validateRequired(['email', 'password']),
)
```

This will check fields with names `email` and `password` to be defined and field check `email` field with email reqexp.

:::caution

Please, pay attantion that form level validation could not contain validation rules for inputs that are not exits in form.
For example if you define rule for field `name` to be required and than you delete this input from JSX than your form will be always invalid.

:::

### ~~field level validation~~

```javascript
import { email, required, composeValidators } from 'common/forms/validation'

const validateEmail = composeValidators(email, required)

function MyForm(){
  return (
    <TextInput
      name="email"
      validate={validateEmail}
    />
  )
}
```

:::caution

Please, pay attantion that you can not use `composeValidators` inside your React Component. It is important that validate function should be unique during all React Component lifecicle.

:::

### ~~conditional validation~~

react-final-form API memoized validate function prop. The best way to handle condition validation is to descripe validate function more correctly.

```javascript
import { email, required, composeValidators } from 'common/forms/validation'

function conditionalRequired(value, allValues){
  if(!allValues.anotherInput) return undefined
  return composeValidators(required, email)(value)
}

function MyForm(){
  return (
    <TextInput
      name="email"
      validate={conditionalRequired}
    />
  )
}
```

## ~~change one field based on another field~~

To make some form state changes on field change it is recommended to use [decorators](https://final-form.org/docs/final-form/types/Decorator)

```javascript
const transferFormdecorator = createDecorator({
  field: /total/,
  updates: (value, name, allValues) => {
    return set(allValues, name.replace('.total', '.debts'), [])
  },
})


finalForm(
  {
    decorators: [transferFormdecorator],
  }
)
```

In this example you will subscribe on change for all fields inside fields array with name that includes `total` in their name and update relevalt field with name `debts` to empty array. 