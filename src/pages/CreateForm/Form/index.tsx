import { createValidator } from 'appConstants';
import {
  Dropdown, FileUploader, Input, Text,
} from 'components';
import { Field, Form, Formik } from 'formik';
import { useSearch, useShallowSelector } from 'hooks';
import React, { VFC } from 'react';
import {
  EInputStatus, ICreateForm, TInputCaption, TSingleProp,
} from 'types';
import nftSelector from 'store/nfts/selectors';

import styles from './styles.module.scss';
import { Properties } from './components';

interface ICreateNFTForm {
  handleSubmit: (values: ICreateForm) => void;
  formValues: ICreateForm;
}

const captionGenerator = (touched: boolean, errors: string | undefined) => {
  const inputState: TInputCaption = { status: EInputStatus.COMMON, caption: '' };
  if (touched && errors) {
    inputState.status = EInputStatus.ERROR;
    inputState.caption = errors;
  }
  return inputState;
};

export const CreateNFTForm: VFC<ICreateNFTForm> = ({ handleSubmit, formValues }) => {
  const categories = useShallowSelector(nftSelector.getProp('categories'));
  const searchValues = useSearch();
  return (
    <Formik initialValues={{ ...formValues }} onSubmit={handleSubmit} enableReinitialize>
      {({
        errors, touched, values, handleChange, handleBlur, setFieldValue,
      }) => (
        <Form className={styles.wrapper}>
          <div className={styles.uploader}>
            <Field id="media" name="media" required>
              {() => <FileUploader onUpload={(file) => setFieldValue('media', file[0])} />}
            </Field>
          </div>
          <div className={styles.information}>
            <Text color="dark0" className={styles.informationTitle}>
              Information
            </Text>
            <Field id="name" name="name" required>
              {({ form: { isSubmitting } }) => (
                <Input
                  name="nftName"
                  id="nftName"
                  value={values.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur}
                  caption={captionGenerator(touched.name, errors.name)}
                  disabled={isSubmitting}
                  label="Name"
                  placeholder="Name"
                  className={styles.fullSize}
                />
              )}
            </Field>
            <Field id="description" name="description" required>
              {({ form: { isSubmitting } }) => (
                <>
                  <Input
                    name="nftDescription"
                    id="nftDescription"
                    value={values.description}
                    onChange={handleChange('description')}
                    onBlur={handleBlur}
                    caption={captionGenerator(touched.description, errors.description)}
                    disabled={isSubmitting}
                    label="Description"
                    placeholder="Default"
                    component="textarea"
                    className={styles.fullSize}
                  />
                  <Text className={styles.counter} size="xs" weight="normal">
                    {values.description.length} / {createValidator.description.max}
                  </Text>
                </>
              )}
            </Field>
            <Field id="category" name="category" required>
              {({ form: { isSubmitting } }) => (
                <Dropdown
                  value={
                    values.category
                      ? { id: values.category.id.toString(), content: values.category.name }
                      : null
                  }
                  placeholder="Choose category"
                  label="Category"
                  disabled={isSubmitting}
                  options={
                    categories.length
                      ? categories.map((c) => ({ id: c.id.toString(), content: c.name }))
                      : []
                  }
                  name="nftCategory"
                  setValue={(category) => setFieldValue('category', category)}
                  withSearch
                  dropPosition="absolute"
                  variant="outlined"
                  {...searchValues}
                />
              )}
            </Field>
            <Field id="properties" name="properties">
              {() => (
                <Properties
                  initProps={values.properties}
                  setProps={(value: TSingleProp[]) => setFieldValue('properties', value)}
                  onBlur={handleBlur('properties')}
                  initErrors={touched.properties && errors.properties}
                />
              )}
            </Field>
          </div>
        </Form>
      )}
    </Formik>
  );
};
