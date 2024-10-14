---
title: "Kısım 12 - Dosya Aktarımı"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---

# 12. Kısım - Dosya Aktarımı

* [Ders videosu](https://youtu.be/qjd5eazfoC0)  
* [Tamamlayıcı video](https://www.youtube.com/live/2lYo_FJxQR8?feature=shared)

## GİRİŞ

Artık kendi internet sunucunuzla bir süredir çalışıyorsunuz ve orada küçük dosyalar oluşturup düzenlemeyi öğrendiniz. Basit bir web sayfasını düzenleyebileceğiniz bir web sunucusu da kurdunuz.  

Bugün, diğer sistemlerinizle sunucunuz arasında dosya transferi yapmayı öğreneceğiz. Örneğin:  

* Sunucunuzdan masaüstü bilgisayarınıza bazı dosyaların bir kopyasını almak  
* Web sayfanız için sunucunuza metin yüklemek  
* Fotoğraflar ve logolar yüklemek  

## BUGÜNKÜ GÖREVLERİNİZ

* Sunucuya bir dosya yükleyin  
* Sunucudan bir dosya indirin  
* Bir yedekleme işlemi senkronize edin  

## PROTOKOLLER

Linux sunucularının dosya paylaşımı için kullanabileceği birçok yöntem vardır:  

* **SMB:** Windows makinelerinin yerel ağda dosya paylaşımı  
* **AFP:** Apple makineleri için dosya paylaşımı  
* **WebDAV:** HTTP protokolleri üzerinden paylaşım  
* **FTP:** Geleneksel internet dosya paylaşım protokolü  
* **scp:** Basit dosya kopyalama desteği  
* **rsync:** Hızlı ve verimli dosya kopyalama  
* **SFTP:** SSH protokolü üzerinden dosya erişimi ve kopyalama (Adına rağmen, teknik olarak klasik FTP ile ilişkisi yoktur)  

Bu yöntemlerin her birinin farklı kullanım alanları olsa da, masaüstü bilgisayarınız ve sunucunuz arasında dosya transferi için **SFTP** birçok avantaj sunar:  

* Sunucuda ek yapılandırma gerektirmez.  
* Üst düzey güvenlik sunar.  
* Dizin yapısında gezinti yapabilirsiniz.  
* Klasör oluşturabilir ve silebilirsiniz.  

Evden, iş yerinden veya bir internet kafeden **SSH** ile giriş yapabiliyorsanız, aynı protokolü kullandığı için **SFTP**’yi de sorunsuz kullanabilirsiniz.

Diğer protokolleri yapılandırmak daha fazla emek gerektirir ve sunucunuza fazladan protokol eklemek, "saldırı yüzeyini" artırır. Yanlış bir yapılandırma, saldırganların sisteme sızmasına neden olabilir. Ayrıca, iş yerindeki güvenlik duvarları bazı protokolleri engelleyebilir. Klasik FTP ise kullanıcı adı ve şifreleri şifrelenmeden ilettiği için, ağdaki birinin bunları yakalaması olasıdır. Eğitim sunucusu için bu büyük bir sorun olmayabilir, ancak üretim sunucularını yönetirken bu risk kabul edilemez.

## SFTP İstemci Yazılımları

SFTP kullanmak için bir istemci yazılımına ihtiyacınız olacak. **_sftp_** adlı komut satırı istemcisi, tüm Apple macOS ve Linux sistemlerinde varsayılan olarak gelir. Linux masaüstü kullanıcıları, dosya yöneticileri aracılığıyla grafiksel bir SFTP istemcisine de sahiptir. Örneğin, **Nautilus** dosya yöneticisinde, _ctrl + L_ tuşlarına basarak "konum penceresi" açılır ve şu şekilde sunucuya bağlanabilirsiniz:  

```  
sftp://kullaniciadi@sunucu-adresi  
```

Windows ve macOS sistemlerinde yerleşik bir SFTP istemcisi yoktur, ancak pek çok ücretsiz ve ücretli üçüncü taraf seçenek mevcuttur:  

* **Windows kullanıcıları:** WinSCP veya FileZilla  
* **macOS kullanıcıları:** CyberDuck veya FileZilla  

Bu programların indirme bağlantıları KAYNAKLAR bölümünde mevcuttur. Bu istemcilerin kullanımı genellikle basittir. Ancak, çoğu istemci birden fazla protokolü (örneğin SCP ve FTP) destekler. Protokol olarak **SFTP veya SSH** seçtiğinizden emin olun. Sunucu adresi olarak IP adresinizi girin, **PORT** 22 olmalıdır.  

## TALİMATLAR

1. Seçtiğiniz SFTP istemcisiyle sunucunuza kullanıcı adınızla giriş yapın.  
2. Sunucudan masaüstü bilgisayarınıza bazı dosyalar indirin (örneğin "home" klasörünüzden ve `/var/log` dizininden).  
3. Sunucunuzun "home" klasöründe "`images`" adlı bir klasör oluşturun ve masaüstünüzden bu klasöre bazı görseller yükleyin.  
4. Kök dizine çıkın ve `/etc`, `/bin` gibi klasörleri görmelisiniz. Burada bir "`images`" klasörü oluşturmaya çalışın. Bu işlem başarısız olmalıdır çünkü normal bir kullanıcı olarak giriş yaptığınız için kök dizinde dosya ve klasör oluşturma yetkiniz yoktur. Ancak, kendi "home" dizininizde tam yetkiye sahipsiniz.  

Dosyaları yükledikten sonra **SSH** ile giriş yaparak `sudo` komutunu kullanabilir ve dosyaları dilediğiniz gibi taşıyabilirsiniz.

## KAYNAKLAR

* [CyberDuck](http://cyberduck.io/)  
* [FileZilla](http://filezilla-project.org/download.php?type=client)  
* [SFTP – SSH Güvenli Dosya Transfer Programı](https://www.ssh.com/ssh/sftp/)  
* [Sunucular Arasında SFTP ile Dosya Transferi](http://www.cyberciti.biz/faq/sftp-file-from-server-to-another-in-unix-linux/)  

Bazı haklar saklıdır. Lisans koşullarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) inceleyebilirsiniz. 

