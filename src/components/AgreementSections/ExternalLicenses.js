import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Headline } from '@folio/stripes/components';
import { DocumentCard } from '@folio/stripes-erm-components';

export default class ExternalLicenses extends React.Component {
  static propTypes = {
    handlers: PropTypes.shape({
      onDownloadFile: PropTypes.func,
    }),
    agreement: PropTypes.shape({
      externalLicenseDocs: PropTypes.arrayOf(
        PropTypes.shape({
          dateCreated: PropTypes.string,
          lastUpdated: PropTypes.string,
          location: PropTypes.string,
          name: PropTypes.string.isRequired,
          note: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
    }),
  };

  render() {
    const externalLicenseDocs = get(this.props, 'agreement.externalLicenseDocs', []);
    if (!externalLicenseDocs.length) {
      return <FormattedMessage id="ui-agreements.license.noExternalLicenses" />;
    }

    return (
      <div>
        <Headline faded margin="none" tag="h4">
          <FormattedMessage id="ui-agreements.license.externalLicenses" />
        </Headline>
        {externalLicenseDocs.map(license => (
          <DocumentCard
            key={license.id}
            onDownloadFile={this.props.handlers.onDownloadFile}
            {...license}
          />
        ))}
      </div>
    );
  }
}