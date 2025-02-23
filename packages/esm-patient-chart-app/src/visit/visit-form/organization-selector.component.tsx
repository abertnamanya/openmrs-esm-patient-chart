import React, { useState } from 'react';
import classNames from 'classnames';
import { ComboBox } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { type Control, Controller } from 'react-hook-form';
import { type OpenmrsResource, useConfig, useFeatureFlag } from '@openmrs/esm-framework';
import { type VisitFormData } from './visit-form.resource';
import { type ChartConfig } from '../../config-schema';
import styles from './visit-form.scss';
import { type Organization, useOrganization } from '../hooks/useOrganization';

interface OrganizationSelectorProps {
  control: Control<VisitFormData>;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({ control }) => {
  const { t } = useTranslation();
  const config = useConfig<ChartConfig>();
  const [searchTerm, setSearchTerm] = useState('');

  const organizations = useOrganization(searchTerm);

  const organizationsToShow: Array<OpenmrsResource> = organizations.results ? organizations.results : [];

  const handleSearch = (searchString) => {
    setSearchTerm(searchString);
  };

  return (
    <section data-testid="combo">
      <div className={styles.sectionTitle}>{t('visitMedicalAid', 'Medical Aid Organization')}</div>
      <div className={classNames(styles.selectContainer, styles.sectionField)}>
        <Controller
          control={control}
          name="visitMedicalAid"
          render={({ field: { onBlur, onChange, value } }) => (
            <ComboBox
              aria-label={t('selectOrganization', 'Select a Medical Aid Organization')}
              id="organization"
              invalidText={t('required', 'Required')}
              items={organizationsToShow}
              itemToString={(org: Organization) => org?.display}
              onBlur={onBlur}
              onChange={({ selectedItem }) => onChange(selectedItem)}
              onInputChange={(searchTerm) => handleSearch(searchTerm)}
              readOnly={false}
              selectedItem={value}
              titleText={t('selectOrganization', 'Select a Medical Aid Organization')}
            />
          )}
        />
      </div>
    </section>
  );
};

export default OrganizationSelector;
