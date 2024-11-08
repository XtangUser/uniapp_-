export function compareTimestamp(timestamp) {
  const currentTime = Date.now();
  const timeDiff = currentTime - timestamp;
  const minutes = timeDiff / 60000;
  const hours = timeDiff / 3600000;
  const days = timeDiff / 86400000;
  const months = timeDiff / 2592000000;

  if (minutes < 1) return '刚刚更新';
  if (minutes < 60) return Math.floor(minutes) + '分钟前更新';
  if (hours < 24) return Math.floor(hours) + '小时前更新';
  if (days < 30) return Math.floor(days) + '天前更新';
  if (months < 3) return Math.floor(months) + '月前更新';
  return null;
}
// 定义一个页面不存在的跳转函数
export function gotoHome(){
	uni.showToast({
		title:'提示',
		content:'页面有误将返回首页',
		showCancel:false,
		success(res) {
			if(res.confirm){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	})
}