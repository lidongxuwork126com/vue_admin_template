1. 需要和php-template项目一起使用 , 本地安装xampp(php要求版本5.x版本), 需要下载后台项目到本地(如果可以配置上数据库)
2. 在index.html 引入pKey, 就是后台给的公钥.
3. 在/news请求的是应用的key, 在api/auth请求的接口
4. 在config/index.js中配置代理接口地址