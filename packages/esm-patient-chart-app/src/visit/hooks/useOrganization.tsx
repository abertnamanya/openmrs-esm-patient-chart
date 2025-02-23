import { useMemo, useState } from 'react';
import { type FetchResponse, openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';
import useSWRImmutable from 'swr/immutable';

export interface Organization {
  uuid: string;
  display: string;
}

export function useOrganization(query: string | null = null) {
  const { data, error, isLoading } = useSWRImmutable<FetchResponse<{ results: Organization[] }>, Error>(
    `${restBaseUrl}/insurance/organization?q=${query}`,
    openmrsFetch,
  );

  if (error) {
    console.error('Failed to fetch organizations: ', error);
  }

  const results = useMemo(
    () => ({
      isLoading,
      error,
      results: data?.data?.results ?? [],
    }),
    [data, error, isLoading],
  );

  return results;
}
