import axios from 'axios'
const appId = 'wx849816d52854ed3e'
const appSecret = '246c09366e3812b779ba4664694994a7'
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) { return pair[1]; }
	}
	return (false);
}

function getUserInfo(code) {
			window.localStorage.setItem('nickname', '123')
			window.localStorage.setItem('avatarurl', '')
			window.localStorage.setItem('OID', '246c09366e3812b779ba4664694994a7')
	// axios.post('/api/recycler/userInfo', {
	// 	appId,
	// 	appSecret,
	// 	code
	// }).then(res => {
	// 	console.log(res)
	// 	let nickname = res.data.nickname
	// 	let avatarurl = res.data.headimgurl
	// 	let OID = res.data.openid
	// 	let _nn = window.localStorage.getItem('nickname')
	// 	let _url = window.localStorage.getItem('avatarurl')
	// 	if (nickname && avatarurl) {

	// 	}
	// }).catch(err => {
	// 	console.log(err)
	// })
}

export default { getQueryVariable, getUserInfo } 