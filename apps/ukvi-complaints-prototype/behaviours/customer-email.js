'use strict';

const Emailer = require('hof-behaviour-emailer');
const path = require('path');
const moment = require('moment');

const getDataRows = (model, translate) => {
  return [
    {
      title: 'Complaint details',
      table: [
        {
          label: 'The reason for the complaint',
          value: translate(`fields.reason.options[${model.reason}].label`)
        },
        {
          label: 'Complaint details',
          value: model['complaint-details']
        }
      ]
    },
    model['agent-name'] && {
      title: 'Your details',
      table: [
        {
          label: 'Full name',
          value: model['agent-name']
        },
        {
          label: 'What is your relation to the applicant?',
          value: translate(`fields['who-representing'].options[${model['who-representing']}].label`)
        }
      ]
    },
    model['agent-representative-name'] && {
      title: 'Applicant details',
      table: [
        {
          label: 'Applicants full name',
          value: model['agent-representative-name']
        },
        {
          label: 'Applicant’s country of nationality',
          value: model['apagent-representative-nationality']
        },
        {
          label: 'Applicant’s date of birth',
          value: moment(model['agent-representative-dob']).format('D MMMM YYYY')
        }
      ]
    },
    model['applicant-name'] && {
      title: 'Your details',
      table: [
        {
          label: 'Full name',
          value: model['applicant-name']
        },
        {
          label: 'Country of nationality',
          value: model['applicant-nationality']
        },
        {
          label: 'Date of birth',
          value: moment(model['applicant-dob']).format('D MMMM YYYY')
        }
      ]
    },
    {
      title: 'Contact details',
      table: [
        {
          label: 'Email address',
          value: model['applicant-email']
        },
        {
          label: 'Phone number (optional)',
          value: model['applicant-phone']
        },
        model['agent-email'] && {
          label: 'Agent Email address',
          value: model['agent-email']
        },
        model['agent-phone'] && {
          label: 'Agent Phone number',
          value: model['agent-phone']
        },
      ]
    }
  ].filter(Boolean);
};

module.exports = config => {
  if (config.transport !== 'stub' && !config.from && !config.replyTo) {
    // eslint-disable-next-line no-console
    console.warn('WARNING: Email `from` address must be provided. Falling back to stub email transport.');
  }
  return Emailer(Object.assign({}, config, {
    transport: config.from ? config.transport : 'stub',
    recipient: model => model['applicant-email'] || model['agent-email'],
    subject: (model, translate) => translate('pages.email.customer.subject'),
    template: path.resolve(__dirname, '../emails/customer.html'),
    parse: (model, translate) => {
        return Object.assign(model, {
          data: getDataRows(model, translate)
        });
    }
  }));
};
