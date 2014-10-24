<?
/* curl 封装
url			URL地址
postdata	post发送的数据
------------------------------*/
function xcurl($url, $postFields = null, $connect = 0, $timeout = 30){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_FAILONERROR, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	//https 请求
	if (strlen($url) > 5 && strtolower(substr($url, 0, 5)) === 'https') {
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	};
	
	// 超时设置
	if($connect){
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $connect);
	};
	if($timeout){
		curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
	};

	if (is_array($postFields) && count($postFields) > 0) {
		$postBodyString = '';
		$postMultipart = false;

		foreach ($postFields as $k => $v) {
			// 判断是不是文件上传
			if ('@' != substr($v, 0, 1)) {
				$postBodyString .= ($k. '=' .urlencode($v) . '&'); 

			// 文件上传用multipart/form-data，否则用www-form-urlencoded
			} else {
				$postMultipart=true;
			}
		}
		unset($k, $v);

		curl_setopt($ch, CURLOPT_POST, true);

		if ($postMultipart) {
			curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
		} else {
			curl_setopt($ch, CURLOPT_POSTFIELDS, substr($postBodyString, 0, -1));
		};
	};

	$reponse = curl_exec($ch);
	
	if (curl_errno($ch)) {
		return 'curl_error:'.curl_errno($ch);
		//throw new Exception(curl_error($ch), 0);

	} else {
		$httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		
		if ($httpStatusCode !== 200) {
			return 'curl_error:' . $httpStatusCode;
			//throw new Exception($reponse, $httpStatusCode);
		};
	};
	curl_close($ch);
	return $reponse;
};
?>