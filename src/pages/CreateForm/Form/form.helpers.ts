import {
  array, boolean, number, object, string, lazy,
} from 'yup';

export const validationSchema = object().shape({
  name: string().min(2, 'Too short name').max(20, 'Too long name').required('This field is required'),
  description: string().max(500, 'Too long description'),
  properties: lazy((value) => {
    if(value.length) {
      return array().of(
        object({
          id: number(),
          name: string().required(),
          type: string().required(),
        }),
      ).test('unique', 'all names must be unique', (val) => {
        const setFields = new Set(val?.map((v) => `${v.name}`));
        return setFields.size === val?.length;
      });
    }
    return array();
  }),
  category: object().nullable().shape({
    id: string(),
  }).required(),
  collection: object().shape({
    withCollection: boolean(),
    collections: array().nullable().when('withCollection', {
      is: true,
      then: (rule) => rule.test('count', 'collection is required', (val) => val.length >= 1),
    }),
  }),
  listing: object().shape({
    listNow: boolean(),
    price: string().when('listNow', {
      is: true,
      then: (rule) => rule.test('price', 'price is not valid', (val) => {
        const price = parseFloat(val);
        return price > 0 && !Object.is(price, NaN);
      }),
    }),
  }),
  quantity: number()
    .test('count', 'not enough', (val) => +val !== 0)
    .required(),
});
