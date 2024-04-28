import { createComponent, createStyles, DropDown, Flex, ReactListItem, Text, useBound, useNotifications, useValidation } from '@anupheaus/react-ui';
import { Helmet } from 'react-helmet';
import { useAboutStyles } from '../about';
import { useState } from 'react';
import { Button } from '../button';

const useStyles = createStyles({
  field: {
    '& input': {
      fontSize: 14,
    },
    '& textarea': {
      fontSize: 14,
    },
  },
  dropdown: {
    '& dropdown-content-container': {
      fontSize: 14,
    },
  },
});

interface Props {
  isActive: boolean;
}

const sourceOptions: ReactListItem[] = [
  { id: 'google', text: 'Google Search' },
  { id: 'facebook', text: 'Facebook' },
  { id: 'instagram', text: 'Instagram' },
  { id: 'friend', text: 'Friend' },
  { id: 'family', text: 'Family' },
  { id: 'advert', text: 'Advert' },
  { id: 'other', text: 'Other' },
];

export const BookAppointment = createComponent('BookAppointment', ({
  isActive,
}: Props) => {
  const { css, join } = useAboutStyles();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [source, setSource] = useState<string>();
  const [additionalInformation, setAdditionalInformation] = useState<string>();
  const { css: localCss } = useStyles();
  const { ValidateSection, getInvalidSections, highlightValidationErrors } = useValidation();
  const { showError } = useNotifications();
  const [result, setResult] = useState<string>();

  const submitRequest = useBound(async () => {
    highlightValidationErrors();
    const invalidSections = getInvalidSections();
    if (invalidSections.length > 0) {
      showError('Please complete all required fields.');
    } else {
      const fetchResult = await fetch('/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phoneNumber, source, additionalInformation }),
      });
      if (fetchResult.ok) {
        setResult('Your request has been submitted successfully.');
      } else {
        setResult((await fetchResult.text()) ?? fetchResult.statusText);
      }
    }
  });

  return (
    <Flex tagName="book-appointment" className={css.about} align="center" isVertical gap={32}>
      {isActive && <Helmet>
        <title>Raynesway Blinds - Book an appointment</title>
        <meta name="description" content={'Book an appointment with Raynesway Blinds today and find out how easily and affordably we can transform your home.'} />
      </Helmet>}
      <Flex tagName="about-main" isVertical gap={16} className={css.section}>
        <Flex tagName="about-content-title" isVertical align="center" className={join(css.box, css.titleBox)}>
          <h2>Request an Appointment</h2>
        </Flex>
        <Flex tagName="about-content-body" isVertical gap={8} className={css.box}>
          {result != null ? (
            <span>{result}</span>
          ) : (
            <ValidateSection name="fields">
              <Flex gap={16}>
                <Text label="You name" value={name} onChange={setName} width="calc(60% - 8px)" className={localCss.field} />
                <Text label="Your phone number" value={phoneNumber} onChange={setPhoneNumber} className={localCss.field} width="calc(40% - 8px)"
                  assistiveHelp="Preferably a mobile number."
                />
              </Flex>
              <Flex gap={16}>
                <Text label="Your email" value={email} onChange={setEmail} isOptional className={localCss.field} width="calc(40% - 8px)" />
                <DropDown label="How did you hear about us?" value={source} onChange={setSource} values={sourceOptions} className={localCss.dropdown} width="calc(60% - 8px)" />
              </Flex>
              <Text label="Additional information" value={additionalInformation} onChange={setAdditionalInformation} isOptional wide className={localCss.field} multiline={3} />
              <Flex align="right" disableGrow>
                <Button onClick={submitRequest}>Submit Request</Button>
              </Flex>
            </ValidateSection>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
});