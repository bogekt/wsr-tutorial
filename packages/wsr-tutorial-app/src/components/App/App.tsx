import React, { useCallback, useMemo, useState } from 'react';
import DeleteSmall from 'wix-ui-icons-common/DeleteSmall';
import {
  Page,
  Layout,
  Cell,
  Card,
  Box,
  Input,
  Dropdown,
  Button,
  FormField,
  Text,
  Breadcrumbs,
  Heading,
  AddItem,
  IconButton,
  WixStyleReactProvider,
} from 'wix-style-react';

import './App.scss';
import DataHooks from './DataHooks';

const colorsOptions = [
  { id: '0', value: 'Red' },
  { id: '1', value: 'Blue' },
  { id: '2', value: 'Green' },
  { id: '3', value: 'Yellow' },
  { id: '4', value: 'Pink' },
];

const breadcrumbItems = [
  {
    id: 1,
    value: 'Root Page',
  },
  {
    id: 2,
    value: 'WSR Form',
  },
];

function getColorById(id: string): string | undefined {
  return colorsOptions.find(({ id: id_ }) => id_ === id)?.value;
}

type MouseEventFunction = (
  event: React.MouseEvent<HTMLElement, MouseEvent>,
) => void;

interface IActionsBar {
  formValid: boolean;
  formEmpty: boolean;
  onClearClicked: MouseEventFunction;
  onSubmitClicked: MouseEventFunction;
}

const ActionsBar = ({
  formValid,
  formEmpty,
  onClearClicked,
  onSubmitClicked,
}: IActionsBar) => (
  <Box>
    <Box marginRight="12px">
      <Button
        dataHook={DataHooks.CLEAR_BUTTON}
        priority="secondary"
        onClick={onClearClicked}
        disabled={formEmpty}
      >
        Clear
      </Button>
    </Box>
    <Button
      disabled={!formValid}
      dataHook={DataHooks.SUBMIT_BUTTON}
      onClick={onSubmitClicked}
    >
      Submit
    </Button>
  </Box>
);

type FormState = Partial<{
  firstName: string;
  lastName: string;
  color: string;
}>;

const App = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [selectedColorId, setSelectedColorId] = useState<string>();
  const [submittedValues, setSubmittedValues] = useState<FormState>();

  const clearForm = useCallback(() => {
    setFirstName('');
    setLastName('');
    setSelectedColorId(undefined);
  }, []);

  const isFormValid = useMemo(
    () => !!firstName && !!lastName,
    [firstName, lastName],
  );

  const isFormEmpty = useMemo(
    () => !firstName && !lastName && !selectedColorId,
    [firstName, lastName, selectedColorId],
  );

  const submitForm = useCallback(() => {
    if (isFormValid) {
      const color = selectedColorId && getColorById(selectedColorId);
      setSubmittedValues({
        firstName,
        lastName,
        color,
      });
    }
  }, [isFormValid, firstName, lastName, selectedColorId]);

  return (
    <WixStyleReactProvider>
      <Page height="100vh">
        <Page.Header
          title="WSR Form"
          breadcrumbs={<Breadcrumbs items={breadcrumbItems} activeId={2} />}
          actionsBar={
            <ActionsBar
              onClearClicked={clearForm}
              onSubmitClicked={submitForm}
              formValid={isFormValid}
              formEmpty={isFormEmpty}
            />
          }
        />
        <Page.Content>
          <Layout>
            <Cell span={8}>
              <Card>
                <Card.Header
                  dataHook={DataHooks.PAGE_HEADER}
                  title="General Info"
                />
                <Card.Divider />
                <Card.Content>
                  <Layout>
                    <Cell>
                      <Layout>
                        <Cell span={6}>
                          <FormField label="First name" required>
                            <Input
                              dataHook={DataHooks.FIRST_NAME}
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </FormField>
                        </Cell>
                        <Cell span={6}>
                          <FormField label="Last name" required>
                            <Input
                              dataHook={DataHooks.LAST_NAME}
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </FormField>
                        </Cell>
                      </Layout>
                    </Cell>
                    <Cell>
                      <Layout gap="12px">
                        <Cell>
                          <Heading appearance="H5">Additional Info</Heading>
                        </Cell>
                        <Cell>
                          <FormField label="Favorite color">
                            <Box verticalAlign="middle" gap="12px">
                              <Box direction="vertical" width="100%">
                                <Dropdown
                                  dataHook={DataHooks.FAVORITE_COLOR}
                                  placeholder="Choose a color"
                                  options={colorsOptions}
                                  selectedId={selectedColorId}
                                  onSelect={(option) =>
                                    setSelectedColorId(option.id as string)
                                  }
                                />
                              </Box>
                              <IconButton
                                size="small"
                                disabled
                                priority="secondary"
                              >
                                <DeleteSmall />
                              </IconButton>
                            </Box>
                          </FormField>
                        </Cell>
                      </Layout>
                    </Cell>
                    <Cell>
                      <AddItem disabled>Add New List Item</AddItem>
                    </Cell>
                  </Layout>
                </Card.Content>
              </Card>
            </Cell>
            <Cell span={4}>
              <Layout>
                <Cell>
                  <Card>
                    <Card.Header
                      title="Role details"
                      suffix={
                        <Button priority="secondary" disabled>
                          Edit
                        </Button>
                      }
                    />
                    <Card.Divider />
                    <Card.Content>
                      <Layout>
                        <Cell>
                          <Heading appearance="H6">Official title</Heading>
                          <Text>Keyboard annihilator</Text>
                        </Cell>
                        <Cell>
                          <Heading appearance="H6">Experience</Heading>
                          <Text>It’s over nine thousand</Text>
                        </Cell>
                      </Layout>
                    </Card.Content>
                  </Card>
                </Cell>
                {submittedValues ? (
                  <Cell>
                    <Card>
                      <Card.Header
                        dataHook={DataHooks.SAVED_DATA}
                        title="Saved data"
                      />
                      <Card.Divider />
                      <Card.Content>
                        <Layout>
                          {[
                            {
                              title: 'First name',
                              value: submittedValues.firstName,
                            },
                            {
                              title: 'Last name',
                              value: submittedValues.lastName,
                            },
                            {
                              title: 'Favorite color',
                              value: submittedValues.color,
                            },
                          ]
                            .filter(({ value }) => !!value)
                            .map(({ title, value }) => (
                              <Cell key={title}>
                                <Heading appearance="H6">{title}</Heading>
                                <Text>{value}</Text>
                              </Cell>
                            ))}
                        </Layout>
                      </Card.Content>
                    </Card>
                  </Cell>
                ) : null}
              </Layout>
            </Cell>
          </Layout>
        </Page.Content>
      </Page>
    </WixStyleReactProvider>
  );
};

export default App;
