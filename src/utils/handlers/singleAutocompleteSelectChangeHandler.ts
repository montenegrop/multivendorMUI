import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import { FormChange } from "@saleor/hooks/useForm";

function createSingleAutocompleteSelectHandler(
  change: FormChange,
  setSelected: (value: string) => void,
  choices: SingleAutocompleteChoiceType[]
): FormChange {
  return (event: React.ChangeEvent<any>) => {
    console.log(event, "eventCategory");
    change(event);
    console.log(event, "eventCategoryChange");

    const value = event.target.value;
    const choice = choices.find(category => category.value === value);
    console.log(choice, 'choiceCat')
    console.log(choices, 'choices')
    setSelected(choice ? choice.label : value);
  };
}

export default createSingleAutocompleteSelectHandler;
