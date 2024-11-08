// 调用系统api进行系统相关页面信息的打印
const SYSTEM_INFO = uni.getSystemInfoSync();

export const getStatusBarHeight = ()=> SYSTEM_INFO.statusBarHeight || 15;

export const getTitleBarHeight = ()=>{
	if(uni.getMenuButtonBoundingClientRect){
		let {top,height} = uni.getMenuButtonBoundingClientRect();
		return height + (top - getStatusBarHeight())*2		
	}else{
		return 40;
	}
}

export const  getNavBarHeight = ()=> getStatusBarHeight()+getTitleBarHeight();
// 判断是否是Mp-头条小程序或者页面h5
export const getLeftIconLeft = ()=> {
	// #ifdef MP-TOUTIAO
		let {leftIcon:{left,width}}  = tt.getCustomButtonBoundingClientRect();
		return left+ parseInt(width);
	// #endif
	
	// #ifndef MP-TOUTIAO
		return 0
	// #endif	
}