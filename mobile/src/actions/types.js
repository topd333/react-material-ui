import { createTypes } from "reduxsauce";

export default createTypes(`
	AUTH_REQUEST
	AUTH_FAILED
	AUTH_SUCCESS

	LOGIN_REQUEST
	LOGIN_SUCCESS
	LOGIN_FAILED

	REGISTER_REQUEST
	REGISTER_SUCCESS
	REGISTER_FAILED

	SEND_SMS_CODE_REQUEST
	SEND_SMS_CODE_SUCCESS
	SEND_SMS_CODE_FAILED

	VERIFY_CODE_REQUEST
	VERIFY_CODE_SUCCESS
	VERIFY_CODE_FAILED
`);