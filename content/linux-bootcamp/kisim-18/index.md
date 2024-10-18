---
title: "Kısım 18 - Loglar, İzleme ve Sorun Giderme"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---

# 18. Kısım - Loglar, İzleme ve Sorun Giderme

* [Ders videosu](https://youtu.be/sd5NFUo5JYM)

## GİRİŞ

Uzaktan bir sunucu yönetirken loglar en iyi dostunuz olur, ancak disk alanı problemleri en büyük düşmanınız olabilir. Linux uygulamaları log üretme konusunda oldukça başarılıdır, ancak bu logların kontrol altında tutulması gerekir.

`logrotate` uygulaması loglarınızı düzenli tutar. Bu araç sayesinde kaç günlük log saklamak istediğinizi belirleyebilir, logları yönetilebilir dosyalara bölebilir, disk alanından tasarruf etmek için sıkıştırabilir veya hatta logları tamamen farklı bir sunucuya gönderebilirsiniz.

İyi sistem yöneticileri otomasyonu sever – bilgisayarın sıkıcı, tekrar eden işleri otomatik yapması gayet mantıklıdır.

## BUGÜNKÜ GÖREVLERİNİZ

* _apache2_ için 3. seviyedeki logları kontrol edin  
* _apache2_ logrotate yapılandırmasını günlük dönecek şekilde düzenleyin

## LOGLARINIZ DÖNÜYOR MU?

Log dizinlerinizi inceleyin – _/var/log_ ve _/var/log/apache2_ gibi alt dizinlere bakın. Loglarınızın zaten döndüğünü görebiliyor musunuz? _/var/log/syslog_ dosyasını ve yanında _/var/log/syslog.1.gz_ gibi eski sıkıştırılmış versiyonlarını görmelisiniz.

## LOGLAR NE ZAMAN DÖNER?

`cron`'un genellikle _/etc/cron.daily_ dizinindeki betikleri çalıştıracak şekilde ayarlandığını hatırlarsınız – burada `logrotate` adlı bir betik veya işlemin ilk sırada çalışmasını sağlamak için _00logrotate_ adlı bir betik görmelisiniz.

## LOGROTATE’İ YAPILANDIRMA

Genel yapılandırma _/etc/logrotate.conf_ dosyasında ayarlanır – buraya göz atın. Ayrıca _/etc/logrotate.d_ dizinindeki dosyalara da bakın, çünkü buradaki içerikler birleştirilerek tam yapılandırma oluşturulur.  

Muhtemelen _apache2_ adında bir dosya göreceksiniz. İçeriği şöyle olabilir:

```
/var/log/apache2/*.log {
    weekly
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 640 root adm
}
```

Bunun çoğu oldukça anlaşılır: Herhangi bir _apache2_ log dosyası haftalık olarak döner ve 52 sıkıştırılmış kopya saklanır.

Genellikle bir uygulama kurduğunuzda, uygun bir logrotate “tarifi” de otomatik olarak yüklenir, bu yüzden sıfırdan bir yapılandırma oluşturmanız gerekmeyecektir. Ancak, varsayılan ayarlar her zaman ihtiyaçlarınızı karşılamayabilir. Sistem yöneticisi olarak bu ayarları düzenlemeniz normaldir – örneğin, yukarıdaki varsayılan _apache2_ yapılandırması haftalık loglar oluşturur, ancak logların günlük döndürülmesi, bir kopyanın otomatik olarak denetçiye e-posta ile gönderilmesi ve sadece 30 günlük logun sunucuda saklanması sizin için daha kullanışlı olabilir.

## KAYNAKLAR

* [Nihai Logrotate Komut Eğitimi](http://www.thegeekstuff.com/2010/07/logrotate-examples/)  
* [LINUX: openSUSE ve logrotate](http://www.youtube.com/watch?v=UoHmj3ef3Is)  
* [Logrotate ile Log Dosyalarını Yönetmek](http://library.linode.com/linux-tools/utilities/logrotate)

## SORUNLARI GİDERİN VE SUNUCUNUZU MUTLU EDİN!

[SadServers.com](https://sadservers.com/) adresindeki bazı zorluklarla öğrendiklerinizi pratiğe dökün:

* ["Manhattan": Veritabanına veri yazılamıyor.](https://sadservers.com/scenario/manhattan)

---

