---
title: "Kısım 07 - Sunucu ve Servisleri"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---
# 7. Kısım - Sunucu ve Servisleri

* [Ders videosu](https://youtu.be/VzXwO0qq-bg)

## GİRİŞ

Bugün yaygın bir sunucu uygulaması olan Apache2 web sunucusunu (httpd) kuracaksınız. Bu, "Hyper Text Transport Protocol Daemon" olarak bilinir!

Eğer bir web sitesi profesyoneliyseniz, bazı şeyleri farklı yapabilirsiniz. Ancak burada odak noktamız Apache'nin kendisi veya web sitesi içeriği değil; şunları daha iyi anlamaktır:

* uygulama kurulumu  
* yapılandırma dosyaları  
* servisler  
* log dosyaları  

## BUGÜNKÜ GÖREVLERİNİZ

* Apache'yi kurarak sunucunuzu bir *web sunucusuna* dönüştürün.

## TALİMATLAR

* Mevcut paket (uygulama) listenizi şu komutla yenileyin:  
  sudo apt update  
  Bu işlem birkaç saniye sürebilir, ancak en güncel sürümleri almanızı sağlar.
* Apache'yi depodan basit bir komutla kurun:  
  sudo apt install apache2  
* Çalıştığını doğrulamak için tarayıcınızda sunucunuzun harici IP adresine gidin:  
  http://[sunucunuzun harici IP’si]  
  Burada bir onay sayfası görmelisiniz.
* Apache bir "servis" olarak kurulur – sunucu açıldığında otomatik olarak başlar ve kimse giriş yapmamış olsa bile çalışmaya devam eder. Aşağıdaki komutla durdurmayı deneyin:  
  sudo systemctl stop apache2  
  Web sayfasının erişilemez hale geldiğini kontrol edin. Ardından şu komutla yeniden başlatın:  
  sudo systemctl start apache2  
  Durumunu kontrol etmek için:  
  systemctl status apache2
* Çoğu Linux yazılımında olduğu gibi, yapılandırma dosyaları _/etc_ dizini altındadır. Özellikle `/etc/apache2` altındaki yapılandırma dosyalarına göz atın. `/etc/apache2/apache2.conf` dosyasını inceleyin – isterseniz less ile görüntüleyebilir veya vim ile düzenleyebilirsiniz.
* `/etc/apache2/apache2.conf` dosyasında "IncludeOptional conf-enabled/*.conf" satırını göreceksiniz. Bu, Apache’ye, *conf-enabled* alt dizinindeki .conf dosyalarının `/etc/apache2/apache2.conf` ile birleştirilerek yüklenmesini söyler. Bu tür küçük, spesifik yapılandırma dosyaları yaygındır.
* Web sunucuları konusunda deneyimliyseniz, sanal hostlar kurabilir veya bazı modüller ekleyebilirsiniz.
* Varsayılan web sayfasının yeri, `/etc/apache2/sites-enabled/000-default.conf` dosyasındaki *DocumentRoot* parametresi ile tanımlanır.
* Varsayılan sayfanın kodunu görmek için `/var/www/html/index.html` dosyasını less veya vim ile inceleyin. Oldukça modern bir tasarım içerir, bu yüzden [http://165.227.92.20/sample](http://165.227.92.20/sample) adresindeki daha basit bir sayfayı ziyaret etmek isteyebilirsiniz. Tarayıcınızda "Kaynağı Görüntüle" seçeneğiyle bu sayfanın kodunu kopyalayın. Ardından şu komutla düzenleyin:  
  sudo vim /var/www/html/index.html  
  Mevcut içeriği silin, basit örneği yapıştırın ve isteğinize göre düzenleyin. Sonucu görmek için tarayıcınızdan _http://[sunucunuzun harici IP’si]_ adresine gidin.
* Çoğu Linux servisinde olduğu gibi, Apache log dosyalarını `/var/log` dizini altında tutar. `/var/log/apache2` altındaki loglara bakın. `access.log` dosyasında test sayfasını ziyaret ettiğinizde oluşturulan kayıtları görebilirsiniz. Buradaki detay miktarı göz korkutucu olabilir – bu normaldir, ancak sonraki derslerde istediğiniz bilgileri filtrelemeyi öğreneceksiniz. `error.log` dosyasına da bakın – umarız ki boş olacaktır!

### AWS/Azure/GCP/OCI Kullanıcılarına Not

Sunucunuza gelen trafiğe izin vermek için port 80’i güvenlik grubunuza eklemeyi unutmayın.

* [AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/working-with-security-groups.html#adding-security-group-rule)  
* [Azure](https://learn.microsoft.com/en-us/answers/questions/1190066/how-can-i-open-a-port-in-azure-so-that-a-constant)  
* [GCP](https://cloud.google.com/firewall/docs/using-firewalls#listing-rules-vm)  
* [Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/developer-tutorials/tutorials/apache-on-oracle-linux/01-summary.htm#add-ingress-rules)

## İLERLEMENİZİ PAYLAŞIN

Metin düzenleme becerilerinizi geliştirin ve ilerlemenizi göstermek için `/var/www/html/index.html` dosyasını vim ile düzenleyip URL’sini foruma gönderin. (Görsel olarak mükemmel olması gerekmez!)

## GÜVENLİK

* Bu sunucunun sistem yöneticisi olarak güvenliğinden sorumlusunuz. Artık sunucunuzun "saldırı yüzeyini" genişlettiniz. 22 numaralı porttan ssh erişimine ek olarak, 80 numaralı portta Apache2 kodunu da açığa çıkardınız. Zamanla loglarınızda çeşitli arama motorları ve saldırganlar tarafından yapılan erişimleri göreceksiniz – bu gayet normaldir.
* Düzenli olarak `sudo apt update` ve ardından `sudo apt upgrade` komutlarını çalıştırın ve önerilen güncellemeleri kabul edin. Böylece en son güvenlik yamalarına sahip olursunuz. Bunu düzenli olarak tekrarlamak önemlidir.

## EK GÖREV

* [Systemctl kullanarak servisleri yönetmek](https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units) hakkında bilgi edinin.

## KAYNAKLAR

* [HTTPD - Apache2 Web Sunucusu](https://ubuntu.com/server/docs/how-to-install-apache2)  
* [Apache HTTP Sunucusu](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/deploying_web_servers_and_reverse_proxies/setting-apache-http-server_deploying-web-servers-and-reverse-proxies#doc-wrapper)  

## SORUN GİDERME VE MUTSUZ SUNUCULARI MUTLU ETME!

[Buradaki](https://sadservers.com/) bazı zorluklarla öğrendiklerinizi pekiştirin:

* ["Cape Town": Borked Nginx](https://sadservers.com/scenario/capetown)

Bazı haklar saklıdır. Lisans şartlarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) kontrol edin.

