# Hướng Dẫn Thiết Lập Dự Án

Dưới đây là các bước cần thiết để thiết lập và chạy dự án của bạn.

### Lưu ý: Cần phải có composer: <a href="https://getcomposer.org/download/">Link tải</a>

## Bước 1: Cài Đặt Các Phụ Thuộc PHP

Chạy lệnh sau để cài đặt tất cả các phụ thuộc PHP được chỉ định trong tệp `composer.json`:

```sh
composer install
```

## Bước 2: Khởi Động Các Dịch Vụ Docker

Chạy lệnh sau để khởi động các dịch vụ Docker được định nghĩa trong tệp `docker-compose.yml`:

```sh
sh docker-script/compose_up.sh
```

## Bước 3: Exec Vào Trong Container Laravel

```sh
sh docker-script/exec-laravel.sh
```

## Bước 4: Cài Đặt Các Phụ Thuộc Node.js

Chạy lệnh sau để cài đặt tất cả các phụ thuộc Node.js được chỉ định trong tệp `package.json`:

```sh
npm install
```

## Bước 5: Copy file .env từ .env.example

```sh
cp .env.example .env
```

## Bước 6: Thêm cấu hình Bitrix24 vào trong file env

```
BITRIX24_APP_ID=
BITRIX24_APP_SECRET=
BITRIX24_SUBDOMAIN=
```

## Bước 7: Truy cập vào domain:

```
http://127.0.0.1:81/
```

## ===========================

## Test 2 

### Lưu ý: Cần phải có ngrok: <a href="https://ngrok.com/download">Link tải</a>

## Bước 1: Chạy ngrok

```
ngrok http 81
```

## Bước 2: Truy cập đường dẫn

```
https://xxx.ngrok-free.app/
```

## Bước 3: Sửa thông tin ứng dụng cục bộ

`Sửa đường dẫn xử lý` và `đường dẫn cài đặt ban đầu ` theo ngrok

## Bước 4: Tạo Inbound webhook và thêm vào .env
```
C_REST_WEBHOOK_URL=
```

## Bước 5: Exec vào container laravel và install npm
```
npm run dev
```
