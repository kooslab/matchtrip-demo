export const requirements = [
	{
		id: 'US-001',
		epic: 'Authentication',
		userStory:
			'As a new user, I want to register with my business email and create a secure password so that I can access the enterprise-grade e-signature platform',
		priority: 'High',
		acceptanceCriteria: [
			'User can register with business email (corporate domain validation)',
			'Password must be at least 12 characters with special characters',
			'System enforces password history (last 5 passwords)',
			'Email verification with 6-digit code (expires in 15 minutes)',
			'Account activation requires admin approval for enterprise plans'
		]
	},
	{
		id: 'US-002',
		epic: 'Authentication',
		userStory:
			'As a security-conscious user, I want to enable multi-factor authentication so that I can protect sensitive business documents',
		priority: 'High',
		acceptanceCriteria: [
			'Support for TOTP (Google Authenticator, Microsoft Authenticator)',
			'Backup codes generation (10 codes, single-use)',
			'FIDO2/WebAuthn support for hardware keys',
			'MFA enforcement for enterprise accounts',
			'MFA status visible in security dashboard'
		]
	},
	{
		id: 'US-003',
		epic: 'Role Management',
		userStory:
			'As an enterprise admin, I want to define granular role-based access controls so that I can maintain security and compliance',
		priority: 'High',
		acceptanceCriteria: [
			'Predefined roles: Admin, Manager, Signer, Viewer',
			'Custom role creation with granular permissions',
			'Department-based role assignment',
			'Time-based role expiration',
			'Audit log for role changes'
		]
	},
	{
		id: 'US-004',
		epic: 'Document Management',
		userStory:
			'As a legal professional, I want to upload and prepare documents for signing with advanced field placement so that I can ensure proper execution',
		priority: 'High',
		acceptanceCriteria: [
			'Support for PDF, DOCX, PPTX, XLSX (up to 50MB)',
			'OCR for scanned documents',
			'Smart field detection and auto-placement',
			'Field validation rules (required, format, length)',
			'Document preview with field placement'
		]
	},
	{
		id: 'US-005',
		epic: 'Signature Workflow',
		userStory:
			'As a business manager, I want to create complex signing workflows so that I can automate multi-party document execution',
		priority: 'High',
		acceptanceCriteria: [
			'Parallel and sequential signing paths',
			'Conditional routing based on responses',
			'Reminder automation (daily, weekly)',
			'Deadline enforcement with escalation',
			'Workflow visualization and monitoring'
		]
	},
	{
		id: 'US-006',
		epic: 'Compliance',
		userStory:
			'As a compliance officer, I want to ensure all signatures meet legal requirements so that documents are legally binding',
		priority: 'High',
		acceptanceCriteria: [
			'eIDAS compliance (QES, AES, SES)',
			'ESIGN Act compliance',
			'Digital certificate integration',
			'Timestamp authority integration',
			'Compliance report generation'
		]
	},
	{
		id: 'US-007',
		epic: 'Integration',
		userStory:
			'As an IT administrator, I want to integrate with existing business systems so that I can streamline document workflows',
		priority: 'Medium',
		acceptanceCriteria: [
			'REST API with OAuth 2.0 authentication',
			'Webhook support for real-time updates',
			'Pre-built connectors for major CRMs',
			'SSO integration (SAML 2.0, OIDC)',
			'Custom integration development kit'
		]
	},
	{
		id: 'US-008',
		epic: 'Analytics',
		userStory:
			'As a business owner, I want to track document processing metrics so that I can optimize operations',
		priority: 'Medium',
		acceptanceCriteria: [
			'Real-time dashboard with KPIs',
			'Document processing time metrics',
			'User activity and adoption rates',
			'Custom report builder',
			'Export to BI tools (Power BI, Tableau)'
		]
	},
	{
		id: 'US-009',
		epic: 'Security',
		userStory:
			'As a security officer, I want to implement advanced security measures so that I can protect sensitive business data',
		priority: 'High',
		acceptanceCriteria: [
			'End-to-end encryption (AES-256)',
			'Data residency options',
			'IP-based access restrictions',
			'Session timeout policies',
			'Security audit logging'
		]
	},
	{
		id: 'US-010',
		epic: 'Billing',
		userStory:
			'As a finance manager, I want to manage subscription and usage-based billing so that I can control costs',
		priority: 'Medium',
		acceptanceCriteria: [
			'Usage-based pricing models',
			'Custom enterprise pricing',
			'Automated invoicing',
			'Cost allocation by department',
			'Usage forecasting'
		]
	}
];
