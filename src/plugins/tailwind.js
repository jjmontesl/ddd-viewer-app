import {
  TInput,
  TTextarea,
//   TSelect,
//   TRadio,
//   TCheckbox,
   TButton,
//   TInputGroup,
//   TCard,
//   TAlert,
//   TModal,
//   TDropdown,
//   TRichSelect,
//   TPagination,
//   TTag,
//   TRadioGroup,
//   TCheckboxGroup,
//   TTable,
//   TDatepicker,
//   TToggle,
//   TDialog,
} from 'vue-tailwind/dist/components';

const settings = {
  // Use the following syntax
  // {component-name}: {
  //   component: {importedComponentObject},
  //   props: {
  //     {propToOverride}: {newDefaultValue}
  //     {propToOverride2}: {newDefaultValue2}
  //   }
  // }
  't-input': {
    component: TInput,
    props: {
      classes: 'border-2 block w-full rounded text-gray-800'
      // ...More settings
    }
  },
  't-textarea': {
    component: TTextarea,
    props: {
      classes: 'border-2 block w-full rounded text-gray-800'
      // ...More settings
    }
  },
  't-button': {
    component: TButton,
    props: {
      classes: 'border-2 block w-full rounded text-gray-800'
      // ...More settings
    }
  },
}

export default settings
