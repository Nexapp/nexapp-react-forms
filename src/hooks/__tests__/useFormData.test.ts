import { RenderHookResult, renderHook, act } from "@testing-library/react-hooks";
import useFormData, { UseFormDataProps, UseFormDataResult } from "../useFormData";

describe("useFormData", () => {
    const NEW_NAME = "newname";
    const NEW_QUANTITY = 25;

    const testData = {
        details: {
            name: "test"
        },
        inventory: {
            quantity: 15
        }
    };

    let helper: UseFormDataHelper<typeof testData>;

    beforeEach(() => {
        helper = new UseFormDataHelper({initialData: testData});
    })

    describe("when changing one of the sub fields", () => {
        it("should change the form data with the given value", () => {
            act(() => {
                helper.onChange("details")("name")(NEW_NAME);
            })

            expect(helper.formData.details.name).toEqual(NEW_NAME)
        })
    })

    describe("when changing another one of the sub fields", () => {
        it("should change the form data with the given value of the corresponding field", () => {
            act(() => {
                helper.onChange("inventory")("quantity")(NEW_QUANTITY);
            })

            expect(helper.formData.inventory.quantity).toEqual(NEW_QUANTITY)
        })
    })


    class UseFormDataHelper<T> {
        private wrapper: RenderHookResult<UseFormDataProps<T>, UseFormDataResult<T>>;

        public get formData(): T{
            return this.wrapper.result.current.formData
        } 

        public get onChange(): <M extends keyof T>(section: M) =>
                                (field: keyof T[typeof section]) =>
                                    (value: T[typeof section][typeof field]) => void {
            return this.wrapper.result.current.onChange
        } 

        constructor(props: UseFormDataProps<T>){
            this.wrapper = renderHook(() => useFormData(props));
        }
    }
})