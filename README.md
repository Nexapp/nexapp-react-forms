# nexapp-react-forms
Form utilities in React

## Hooks
### useFormData
Exposes a hook taking an `initialData` object. You can use it to receive the `formData` of the object as well as an `onChange` method. The `onChange` method will adapt it's parameters according to the type of the `initialData`. 

For example you have an `initialData` like this: 
```json
{
    "details": {
        "name": "value"
    },
    "inventory": {
        "quantity": 15
    }
}
```
When giving an object like this to the `useFormData` hook, the `onChange` method will be callable like this: `onChange("details")("name")("newValue)`. Which will change the `formData` from the hook with the updated value in the details.name field. For the moment this method can only go one level 2 level deep so any complex objects will have to be update entirely when calling this method.

We use this hook to simplify our forms. We can then structure our form to represent each section of the data structure. Then each section will receive the underlying section. We can then give them `formData.details` as value and `onChange("details")` as onChange method. Giving us maximum flexibility to add/remove/change fields of the data structure without impacting the props we give to each components.