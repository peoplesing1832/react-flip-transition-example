FROM nginx

# 拷贝服务器的前端资源到镜像之中
# https://github.com/moby/moby/issues/15858

COPY . /var/www/flip/

# 拷贝服务器的nginx配置到镜像之中
COPY ./nginx/flip.conf /etc/nginx/conf.d/

RUN service nginx restart
