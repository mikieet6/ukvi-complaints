'use strict';

const conditionalContent = require('./behaviours/conditional-content');

const translation = require('./translations/en/default.json').fields;

const moment = require('moment');

module.exports = {
  name: 'ukvi-complaints-prototype',
  baseUrl: '/',
  steps: {
    '/start': {
      next: '/reason'
    },
    '/reason': {
      fields: ['reason'],
      next: '/immigration-application',
      forks: [{
        target: '/immigration-application',
        condition: {
          field: 'reason',
          value: 'immigration-application'
        }
      }, {
        target: '/immigration-appointment',
        condition: {
          field: 'reason',
          value: 'immigration-appointment'
        }
      }, {
        target: '/delays',
        condition: {
          field: 'reason',
          value: 'delays'
        }
      }, {
        target: '/decision-outcome',
        condition: {
          field: 'reason',
          value: 'immigration-decision'
        }
      }, {
        target: '/biometric-residence-permit',
        condition: {
          field: 'reason',
          value: 'biometric-residence-permit'
        }
      }, {
        target: '/refund',
        condition: {
          field: 'reason',
          value: 'refund'
        }
      }, {
        target: '/poor-info-or-behaviour',
        condition: {
          field: 'reason',
          value: 'staff-behaviour'
        }
      }, {
        target: '/existing-complaint',
        condition: {
          field: 'reason',
          value: 'existing-complaint'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'reason',
          value: 'other-complaint'
        }
      }],
    },
    '/immigration-application': {
      fields: ['immigration-application'],
      forks: [{
        target: '/application-technical',
        condition: {
          field: 'immigration-application',
          value: 'technical-issues'
        }
      }, {
        target: '/application-guidance-where',
        condition: {
          field: 'immigration-application',
          value: 'guidance'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'immigration-application',
          value: 'complain'
        }
      }],
      next: '/complaint-details'
    },
    '/application-technical': {
      fields: ['where-applied-from'],
      forks: [{
        target: '/application-technical-inside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/application-technical-outside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }],
      next: '/complaint-details'
    },

    '/application-technical-inside-uk': {

    },

    '/application-technical-outside-uk': {

    },

    '/application-guidance-where': {
      fields: ['where-applied-from'],
      forks: [{
        target: '/application-guidance-inside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/application-guidance-outside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },

    '/application-guidance-inside-uk': {
    },

    '/application-guidance-outside-uk': {
    },

    '/immigration-appointment': {
      fields: ['immigration-appointment'],
      forks: [{
        target: '/lack-availability',
        condition: {
          field: 'immigration-appointment',
          value: 'lack-availability'
        }
      }, {
        target: '/change-appointment',
        condition: {
          field: 'immigration-appointment',
          value: 'change-appointment'
        }
      }, {
        target: '/questions-appointments',
        condition: {
          field: 'immigration-appointment',
          value: 'questions-appointments'
        }
      }, {
        target: '/appointment-technical',
        condition: {
          field: 'immigration-appointment',
          value: 'technical-appointments'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'immigration-appointment',
          value: 'complain-appointments'
        }
      }],
      next: '/complaint-details'
    },
    '/lack-availability': {
      fields: ['where-applied-from'],
      forks: [{
        target: '/lack-availability-inside',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/lack-availability-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }],
      next: '/complaint-details'
    },
    '/lack-availability-inside': {

    },
    '/lack-availability-outside': {

    },
    '/change-appointment': {
      fields: ['where-applied-from'],
      forks: [{
        target: '/change-appointment-inside',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/change-appointment-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }],
      next: '/complaint-details'
    },

    '/change-appointment-inside': {

    },
    '/change-appointment-outside': {

    },
    '/appointment-technical': {
      fields: ['where-applied-from'],
      forks: [{
        target: '/appointment-technical-inside',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/appointment-technical-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }],
    },
    '/appointment-technical-inside': {

    },
    '/appointment-technical-outside': {

    },
    '/questions-appointments': {
      fields: ['where-applied-from'],
      forks: [{
        target: '/questions-appointments-inside',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/questions-appointments-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },
    '/questions-appointments-outside': {

    },
    '/questions-appointments-inside': {

    },
    '/delays': {
      fields: ['delay-type'],
      forks: [{
        target: '/request-upgrade',
        condition: {
          field: 'delay-type',
          value: 'application-delay'
        }
      }, {
        target: '/return-of-documents',
        condition: {
          field: 'delay-type',
          value: 'return-of-documents'
        }
      }]
    },
    '/application-delay': {
      fields: ['application-delay'],
      forks: [{
        target: '/request-upgrade',
        condition: {
          field: 'application-delay',
          value: 'request-upgrade'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'application-delay',
          value: 'application-ref-numbers'
        }
      }]
    },

    '/request-upgrade': {
      fields: ['where-applied-from'],
      forks: [{
        target: '/upgrade-inside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/upgrade-outside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }],
      next: '/complaint-details'
    },

    '/upgrade-inside-uk': {

    },
    '/upgrade-outside-uk': {

    },
    '/application-ref-numbers': {
      fields: ['reference-numbers'],
      next: '/acting-as-agent'
    },
    '/reference-numbers': {
      fields: ['reference-numbers'],
      next: '/complaint-details'
    },
    '/return-of-documents': {
      fields: ['return-of-documents'],
      forks: [{
        target: '/report-lost-docs-service',
        condition: {
          field: 'return-of-documents',
          value: 'yes-docs-service'
        }
      }, {
        target: '/request-docs-service',
        condition: {
          field: 'return-of-documents',
          value: 'yes-other'
        }
      }, {
        target: '/request-docs-service',
        condition: {
          field: 'return-of-documents',
          value: 'no'
        }
      }],
      next: '/complaint-details'
    },
    '/requested-documents': {
      fields: ['requested-documents'],
      forks: [{
        target: '/have-requested',
        condition: {
          field: 'requested-documents',
          value: 'yes'
        }
      }, {
        target: '/request-docs-service',
        condition: {
          field: 'requested-documents',
          value: 'no'
        }
      }]
    },
    '/have-requested': {
      fields: ['have-requested'],
      forks: [{
        target: '/report-lost-docs-service',
        condition: {
          field: 'have-requested',
          value: 'used-service'
        }
      }, {
        target: '/request-docs-service',
        condition: {
          field: 'have-requested',
          value: 'something-else'
        }
      }],
      next: '/complaint-details'
    },
    '/request-docs-service': {
      next: '/complaint-details'
    },
    '/report-lost-docs-service': {
      next: '/complaint-details'
    },
    '/immigration-decision': {
      fields: ['immigration-decision'],
      forks: [{
        target: '/decision-outcome',
        condition: {
          field: 'immigration-decision',
          value: 'yes'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'immigration-decision',
          value: 'no'
        }
      }],
      next: '/complaint-details'
    },

    '/decision-outcome': {
      fields: ['decision-outcome'],
      forks: [{
        target: '/positive-outcome-where',
        condition: {
          field: 'decision-outcome',
          value: 'positive'
        }
      }, {
        target: '/negative-outcome',
        condition: {
          field: 'decision-outcome',
          value: 'negative'
        }
      }],
      next: '/complaint-details'
    },

    '/positive-outcome-where': {
      fields: ['where-applied-from'],
      forks: [{
        target: '/positive-outcome-inside',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/positive-outcome-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }],
      next: '/complaint-details'
    },

    '/positive-outcome-inside': {
      next: '/complaint-details'
    },
    '/positive-outcome-outside': {
      next: '/complaint-details'
    },

    '/negative-outcome': {
      next: '/complaint-details'
    },

    '/immigration-status-change': {
      fields: ['immigration-status-change'],
      forks: [{
        target: '/questions-status-change',
        condition: {
          field: 'immigration-status-change',
          value: 'questions-status-change'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'immigration-status-change',
          value: 'complain-status-change'
        }
      }],
      next: '/complaint-details'
    },

    '/questions-status-change': {

      next: '/complaint-details'
    },
    '/biometric-residence-permit': {
      fields: ['biometric-residence-permit'],
      forks: [{
        target: '/card-not-arrived',
        condition: {
          field: 'biometric-residence-permit',
          value: 'card-not-arrived'
        }
      }, {
        target: '/letter-not-arrived',
        condition: {
          field: 'biometric-residence-permit',
          value: 'letter-not-arrived'
        }
      }, {
        target: '/card-incorrect',
        condition: {
          field: 'biometric-residence-permit',
          value: 'card-incorrect'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'biometric-residence-permit',
          value: 'complain-brp'
        }
      }]
    },
    '/card-not-arrived': {
      next: 'complaint-detials'
    },
    '/letter-not-arrived': {
      next: 'complaint-detials'
    },
    '/card-incorrect': {
      next: 'complaint-detials'
    },
    '/complain-brp': {
      next: 'complaint-detials'
    },
    '/refund-type': {
      fields: ['refund-type'],
      forks: [{
        target: '/refund-ihs',
        condition: {
          field: 'refund-type',
          value: 'ihs'
        }
      }, {
        target: '/refund-standard',
        condition: {
          field: 'refund-type',
          value: 'standard'
        }
      }, {
        target: '/refund-priority',
        condition: {
          field: 'refund-type',
          value: 'priority'
        }
      }, {
        target: '/refund-super-priority',
        condition: {
          field: 'refund-type',
          value: 'super-priority'
        }
      }, {
        target: '/refund-premium',
        condition: {
          field: 'refund-type',
          value: 'premium'
        }
      }, {
        target: '/refund-eu-settlement',
        condition: {
          field: 'refund-type',
          value: 'eu-settlement'
        }
      }],
      next: '/refund'
    },
    '/refund-ihs': {

    },
    '/refund-standard': {

    },
    '/refund-priority': {

    },
    '/refund-super-priority': {

    },
    '/refund-premium': {

    },
    '/refund-eu-settlement': {

    },
    '/refund': {
      fields: ['refund'],
      forks: [{
        target: '/refund-when',
        condition: {
          field: 'refund',
          value: 'yes'
        }
      }, {
        target: '/refund-type',
        condition: {
          field: 'refund',
          value: 'no'
        }
      }, {
        target: '/refund-type-automatic',
        condition: {
          field: 'refund',
          value: 'not-yet'
        }
      }],
      next: '/complaint-details'
    },
    '/refund-when': {
      fields: ['refund-when'],
      forks: [{
        target: '/refund-less-than',
        condition: {
          field: 'refund-when',
          value: 'less-than'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'refund-when',
          value: 'more-than'
        }
      }]
    },
    '/refund-type-automatic': {
      fields: ['refund-type-automatic'],
      forks: [{
        target: '/refund-ihs',
        condition: {
          field: 'refund-type-automatic',
          value: 'ihs'
        }
      }, {
        target: '/refund-eu-settlement',
        condition: {
          field: 'refund',
          value: 'eu-settlement'
        }
      }],
      next: '/complaint-details'
    },
    '/refund-when': {
      fields: ['refund-when'],
      forks: [{
        target: '/refund-less-than',
        condition: {
          field: 'refund-when',
          value: 'less-than'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'refund-when',
          value: 'more-than'
        }
      }]
    },
    '/refund-less-than': {

    },
    '/refund-more-than': {

    },
    '/refund-request': {

    },
    '/poor-info-or-behaviour': {
      fields: ['poor-info-or-behaviour'],
      forks: [{
        target: '/application-ref-numbers',
        condition: {
          field: 'poor-info-or-behaviour',
          value: 'poor-information'
        }
      }, {
        target: '/staff-behaviour',
        condition: {
          field: 'poor-info-or-behaviour',
          value: 'staff-behaviour'
        }
      }]
    },
    '/staff-behaviour': {
      fields: ['staff-behaviour'],
      forks: [{
        target: '/face-to-face',
        condition: {
          field: 'staff-behaviour',
          value: 'face-to-face'
        }
      }, {
        target: '/on-phone',
        condition: {
          field: 'staff-behaviour',
          value: 'on-phone'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'staff-behaviour',
          value: 'in-letter'
        }
      }],
      next: '/complaint-details'
    },
    '/face-to-face': {
      fields: ['which-centre'],
      forks: [{
        target: '/vac',
        condition: {
          field: 'which-centre',
          value: 'vac'
        }
      }, {
        target: '/ssc',
        condition: {
          field: 'which-centre',
          value: 'ssc'
        }
      }, {
        target: '/ukvcas',
        condition: {
          field: 'which-centre',
          value: 'ukvcas'
        }
      }]
    },
    '/vac': {
      fields: ['vac-country', 'vac-city'],
      next: '/application-ref-numbers'
    },
    '/ssc': {
      fields: ['ssc-city'],
      next: '/application-ref-numbers'
    },
    '/ukvcas': {
      fields: ['ukvcas-city'],
      next: '/application-ref-numbers'
    },
    '/on-phone': {
      fields: ['called-number'],
      next: '/called-date'
    },
    '/called-date': {
      fields: ['called-date', 'called-time'],
      next: '/called-from'
    },
    '/called-from': {
      fields: ['called-from'],
      next: '/application-ref-numbers'
    },
    '/existing-complaint': {
      fields: ['existing-complaint'],
      forks: [{
        target: '/complaint-reference-number',
        condition: {
          field: 'existing-complaint',
          value: 'yes'
        }
      }, {
        target: '/complaint-reason-previous',
        condition: {
          field: 'existing-complaint',
          value: 'no'
        }
      }],
      next: '/complaint-details'
    },
    '/complaint-reference-number': {
      fields: ['complaint-reference-number'],
      next: '/complaint-details'
    },
    '/complaint-reason-previous': {
      fields: ['complaint-reason-previous'],
      next: '/acting-as-agent'
    },
    '/other-complaint': {
      fields: ['other-complaint'],
      next: '/complaint-details'
    },
    '/when-applied': {
      fields: ['when-applied'],
      next: '/application-ref-numbers'
    },
    '/acting-as-agent': {
      fields: ['acting-as-agent'],
      next: '/complaint-details',
      forks: [{
        target: '/who-representing',
        condition: {
          field: 'acting-as-agent',
          value: 'yes'
        }
      }, {
        target: '/applicant-name',
        condition: {
          field: 'acting-as-agent',
          value: 'no'
        }
      }]
    },

    '/who-representing': {
      fields: ['who-representing'],
      next: '/agent-name'
    },
    '/agent-name': {
      fields: ['agent-name'],
      next: '/agent-contact-details'
    },
    '/agent-contact-details': {
      fields: ['agent-email', 'agent-phone'],
      next: '/agent-representative-name'
    },
    '/agent-representative-name': {
      fields: ['agent-representative-name'],
      next: '/agent-representative-dob'
    },
    '/agent-representative-dob': {
      fields: ['agent-representative-dob'],
      next: '/agent-representative-nationality'
    },
    '/agent-representative-nationality': {
      fields: ['agent-representative-nationality'],
      next: '/complaint-details'
    },
    '/applicant-name': {
      fields: ['applicant-name'],
      next: '/applicant-dob'
    },
    '/applicant-dob': {
      fields: ['applicant-dob'],
      next: '/applicant-nationality'
    },
    '/applicant-nationality': {
      fields: ['applicant-nationality'],
      next: '/applicant-contact-details'
    },
    '/applicant-contact-details': {
      fields: ['applicant-email', 'applicant-phone'],
      next: '/complaint-details'
    },
    '/complaint-details': {
      behaviours: [conditionalContent],
      fields: ['complaint-details'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: ['complete', require('hof-behaviour-summary-page')],
      next: '/complete',
      sections: {
        'complaint-details': [
          {
            field: 'reason',
            parse: (value) => {
              return translation.reason.options[value].label;
            }
          },
          'complaint-details'
        ],
        'agent-details': [
          'agent-name'
        ],
        'applicant-details': [
          'agent-representative-name',
          'agent-representative-nationality',
          {
            field: ' agent-representative-dob',
            parse: (value) => {
              return moment(value).format('D MMMM YYYY');
            }
          }
        ],
        'your-details': [
          'applicant-name',
          'applicant-nationality',
          {
            field: 'applicant-dob',
            parse: (value) => {
              return moment(value).format('D MMMM YYYY');
            }
          }
        ],
        'contact-details': [
          'applicant-email',
          'applicant-phone',
          'agent-email',
          'agent-phone',
        ]
      }
    },
    '/complete': {
      template: 'confirmation'
    }
  }
};
