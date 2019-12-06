'use strict';

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
        target: '/application-delay',
        condition: {
          field: 'reason',
          value: 'application-delay'
        }
      }, {
        target: '/return-of-documents',
        condition: {
          field: 'reason',
          value: 'return-of-documents'
        }
      }, {
        target: '/immigration-decision',
        condition: {
          field: 'reason',
          value: 'immigration-decision'
        }
      }, {
        target: '/immigration-status-change',
        condition: {
          field: 'reason',
          value: 'immigration-status-change'
        }
      }, {
        target: '/biometric-residence-permit',
        condition: {
          field: 'reason',
          value: 'biometric-residence-permit'
        }
      }, {
        target: '/refund-type',
        condition: {
          field: 'reason',
          value: 'refund'
        }
      }, {
        target: '/staff-behaviour',
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
        target: '/complaint',
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
        target: '/contact-ukvi',
        condition: {
          field: 'immigration-application',
          value: 'guidance'
        }
      }, {
        target: '/complaint-details',
        condition: {
          field: 'immigration-application',
          value: 'complain'
        }
      }],
      next: '/complaint-details'
    },
    '/application-technical': {
      next: '/applicant-contact-details'
    },
    '/contact-ukvi': {
      next: '/applicant-contact-details'
    },
    '/where-applied-from': {
      fields: ['where-applied-from'],
      forks: [{
        target: '/lack-availability',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }],
      next:'/complaint-details'
    },
    '/immigration-appointment': {
      fields: ['immigration-appointment'],
      forks: [{
        target: '/where-applied-from',
        condition: {
          field: 'immigration-appointment',
          value: 'lack-availability'
        }
      }, {
        target: '/where-applied-from',
        condition: {
          field: 'immigration-appointment',
          value: 'change-appointment'
        }
      }, {
        target: '/contact-ukvi',
        condition: {
          field: 'immigration-appointment',
          value: 'questions-appointments'
        }
      }, {
        target: '/contact-ukvi',
        condition: {
          field: 'immigration-appointment',
          value: 'technical-appointments'
        }
      }, {
        target: '/complaint-details',
        condition: {
          field: 'immigration-appointment',
          value: 'complain-appointments'
        }
      }],
      next: '/complaint-details'
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
    '/application-ref-numbers': {
      fields: ['have-reference-numbers'],
      forks: [{
        target: '/reference-numbers',
        condition: {
          field: 'have-reference-numbers',
          value: 'yes'
        }
      }, {
        target: '/complaint-details',
        condition: {
          field: 'have-reference-numbers',
          value: 'no'
        }
      }],
      locals: {
        section: 'complaint-details',
        'details-summary-id': 'reference-number-help',
        // 'details-summary': pagesTranslations['reference-numbers']
      }
    },
    '/reference-numbers': {
      fields: ['reference-numbers'],
      next: '/complaint-details'
    },
    '/return-of-documents': {
      fields: ['return-of-documents'],
      forks: [{
        target: '/requested-documents',
        condition: {
          field: 'return-of-documents',
          value: 'yes'
        }
      }, {
        target: '/application-ref-numbers',
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
        target: '/positive-outcome',
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

    '/positive-outcome': {
      next: '/complaint-details'
    },

    '/negative-outcome': {
      next: '/complaint-details'
    },

    '/immigration-status-change': {
      fields: ['immigration-status-change'],
      forks: [{
        target: '/complaint-details',
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
    '/card-not-arrived':{
      next: 'complaint-detials'
    },
    '/letter-not-arrived':{
      next: 'complaint-detials'
    },
    '/card-incorrect':{
      next: 'complaint-detials'
    },
    '/complain-brp':{
      next: 'complaint-detials'
    },
    '/refund-type': {
      fields: ['refund-type'],
      forks: [{
        target: '/ihs-refund',
        condition: {
          field: 'refund-type',
          value: 'ish'
        }
      }],
      next: '/refund'
    },
    '/ihs-refund': {

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
        target: '/refund-request',
        condition: {
          field: 'refund',
          value: 'no'
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
        target: '/refund-more-than',
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
    '/on-phone': {
      fields: ['called-number'],
      next: '/called-date'
    },
    '/called-date': {
      fields: ['called-date'],
      next: '/called-time'
    },
    '/called-time': {
      fields: ['called-time'],
      next: '/called-from'
    },
    '/called-from': {
      fields: ['called-from'],
      next: '/application-ref-numbers'
    },
    '/existing-complaint': {
      fields: ['existing-complaint'],
      forks: [{
        target: '/complint-reference-number',
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
    '/other-complaint': {
      fields: ['other-complaint'],
      next: '/complaint-details'
    },
    '/complaint-details': {
      fields: ['complaint-details'],
      next: '/acting-as-agent'
    },
    '/acting-as-agent': {
      fields: ['acting-as-agent'],
      next: '/complaint-details',
      forks: [{
        target: '/agent-contact-details',
        condition: {
          field: 'acting-as-agent',
          value: 'yes'
        }
      }, {
        target: '/applicant-details',
        condition: {
          field: 'acting-as-agent',
          value: 'no'
        }
      }]
    },
    '/agent-contact-details': {
      fields: ['agent-name','agent-email','agent-phone'],
      next: '/agent-representative-details'
    },
    '/agent-representative-details': {
      fields: ['representative-name','representative-dob','representative-nationality'],
      next: '/complaint-details'
    },
    '/applicant-details': {
      fields: ['applicant-name','applicant-dob','applicant-nationality'],
      next: '/applicant-contact-details'
    },
    '/applicant-contact-details': {
      fields: ['applicant-email','applicant-phone'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: ['complete', require('hof-behaviour-summary-page')],
      next: '/complete'
    },
    '/complete': {
      template: 'confirmation'
    }
  }
};
