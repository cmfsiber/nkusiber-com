---
title: "Kısım 13 - Kullanıcılar ve Gruplar"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---

# 13. Kısım - Kullanıcılar ve Gruplar

* [Ders videosu](https://youtu.be/mBcExazxLU8)  
* [Tamamlayıcı video](https://www.youtube.com/live/2lYo_FJxQR8?feature=shared)

## GİRİŞ

Bugün sisteminize yeni bir kullanıcı ekleyeceksiniz. Yardım masasında çalıştığını hayal ettiğiniz, yalnızca bazı basit görevleri yapmasını istediğiniz bir kullanıcı ekleyeceğiz. Bu görevler:  

* Sistemin çalıştığını kontrol etmek  
* Disk alanını kontrol etmek: `df -h`  

Ayrıca, "kapatıp açmanın" birçok sorunu çözdüğüne inandığınız için bu kişinin sistemi yeniden başlatabilmesini de istiyorsunuz. 😊

Bugün birkaç yeni konuyu ele alacağız. Keyifli öğrenmeler!

## BUGÜNKÜ GÖREVLERİNİZ

* Yeni bir kullanıcı oluşturun  
* Yeni bir grup oluşturun  
* Mevcut bir gruba yeni bir kullanıcı ekleyin  
* Yeni bir kullanıcıyı sudo yetkisiyle donatın  

[Bu demo](https://asciinema.org/a/631680) size adım adım rehberlik edecektir.

## YENİ KULLANICI EKLEME

Yeni kullanıcınıza bir isim verin. Örneğin, "helen" kullanacağız. Yeni kullanıcıyı eklemek için:  

```bash
sudo adduser helen
```

(Linux'ta büyük-küçük harf duyarlıdır; "Helen" ve "helen" farklı kullanıcılar olur.)  

`adduser` komutu, dağıtıma bağlı olarak biraz farklı çalışabilir. Eğer sizden parola istemediyse, şimdi manuel olarak şu komutla ayarlayın:  

```bash
sudo passwd helen
```

Yeni kullanıcı, kullanıcı bilgilerini tutan `/etc/passwd` dosyasına eklenir (kontrol etmek için: `less /etc/passwd`). Aynı isimde bir grup da `/etc/group` dosyasına eklenir. Kullanıcının parolasının karma değeri `/etc/shadow` dosyasında saklanır (bu dosyayı görmek için `sudo` kullanmanız gerekir). Güvenlik nedeniyle bu dosya herkes tarafından okunamaz.

`adduser` ayrıca doğru izinlerle bir ana dizin (örneğin `/home/helen`) oluşturur.  

**DİKKAT!** `useradd` komutu ile `adduser` aynı şey değildir. Her ikisi de kullanıcı ekler, ancak çalışma şekilleri farklıdır. Aralarındaki farkları görmek için EK bölümündeki bağlantıyı inceleyin.

## YENİ GRUP OLUŞTURMA

Örneğin, tüm geliştiricilerin aynı kaynaklara erişebileceği bir grup oluşturmak isteyebilirsiniz:  

```bash
sudo groupadd developers
```

Modern Linux sistemlerinde, her kullanıcıya ait bir grup oluşturulur (örneğin, "ubuntu" kullanıcısı "ubuntu" grubuna aittir). Ancak yeni bir kullanıcıyı doğrudan mevcut bir gruba eklemek istiyorsanız:  

```bash
sudo adduser --ingroup developers fred
```

## KULLANICIYI GRUPLARA EKLEME

Kullanıcılar birden fazla gruba ait olabilir. Hangi gruplara üye olduğunuzu görmek için:  

```bash
groups
```

Ubuntu’da ilk kullanıcı (örneğin `ubuntu`), `ubuntu`, `sudo` ve `admin` gruplarına üye olur. `/var/log` klasörüne bakarsanız, `sudo` grubuna üyeliğiniz sayesinde `/var/log/auth.log` dosyasını okuyabildiğinizi göreceksiniz.  

Bir kullanıcıyı mevcut bir gruba eklemek için:  

```bash
sudo usermod -a -G group user
```

Örneğin, `ubuntu` kullanıcınız şu şekilde `helen`'i `sudo` grubuna ekleyebilir:  

```bash
sudo usermod -a -G sudo helen
```

Sonra şu komutla `helen`'in hangi gruplara üye olduğunu kontrol edin:  

```bash
groups helen
```

`fred` için de deneyin ve her şeyin doğru çalıştığından emin olun. Kullanıcılarınızın `sudo reboot` komutunu çalıştırabildiğinden emin olun.

## SUDO HİLELERİ

Yeni kullanıcılar varsayılan olarak `sudo` yetkisiyle gelmez. `helen`'i doğrudan `sudo` grubuna ekledik, ancak `fred` için daha sınırlı yetkiler vermek isteyebilirsiniz.  

Önce `/etc/sudoers` dosyasının izinlerine bakın:  

```bash
ls -l /etc/sudoers
```

Bu dosya, sudo izinlerinin tanımlandığı yerdir. Düzenlemek için `visudo` aracını kullanmanız gerekir:  

```bash
sudo -i
visudo
```

Dosyada şu satırları ekleyin:  

```
# Kullanıcı "fred" için sudo reboot yetkisi
# Parola istemeden çalıştırma
fred ALL = NOPASSWD:/sbin/reboot
```

`visudo` komutu, sözdizimi hatalarını otomatik olarak kontrol eder ve hatalı bir dosyayı kaydetmenize izin vermez. Yanlış bir sudoers dosyası sunucuya erişiminizi engelleyebilir!  

`exit` komutuyla normal kullanıcıya dönün. Promptunuz tekrar `$` işaretine dönmelidir.

## TEST

Yeni kullanıcıyla giriş yapıp şu komutu çalıştırın:  

```bash
sudo reboot
```

Kullanıcı değiştirerek `helen` olarak giriş yapmak için:  

```bash
sudo su helen
```

Eğer SSH ayarlarınız yalnızca açık anahtarlarla girişe izin veriyorsa, `/home/helen/.ssh/authorized_keys` dosyasını doğru izinlerle yapılandırmanız gerekecek. Bu, öğrendiklerinizi test etmek için güzel bir fırsat olacaktır.

## EK BİLGİLER

Bu konulara aşinaysanız, aşağıdaki bağlantılarla bilginizi güncelleyebilirsiniz:  

* [Kabuk erişimini kısıtlama](http://www.cyberciti.biz/tips/howto-linux-shell-restricting-access.html)  
* [Linux Parola & Shadow Dosya Formatları](https://www.tldp.org/LDP/lame/LAME/linux-admin-made-easy/shadow-file-formats.html)  
* ['useradd' ve 'adduser' arasındaki fark](https://serverfault.com/questions/218993/whats-the-difference-between-useradd-and-adduser)  
* [Linux'ta komut satırından kullanıcı ve grup oluşturma](https://www.techrepublic.com/article/how-to-create-users-and-groups-in-linux-from-the-command-line/)  
* [$EDITOR çevresel değişkenini kullanarak varsayılan düzenleyicinizi ayarlayın](https://www.a2hosting.com/kb/developer-corner/linux/setting-the-default-text-editor-in-linux). Bu sayede `visudo` komutunda `nano` yerine `vim` kullanabilirsiniz.

## KAYNAKLAR

* [Sudoers Dosyasını Düzenleme](https://www.digitalocean.com/community/tutorials/how-to-edit-the-sudoers-file)  
* [Sudo – İleri Düzey Rehber](https://centoshelp.org/security/sudo-an-advanced-howto/)  
* [xkcd: Bir karikatür](http://xkcd.com/149/)  
* [Temel Linux İzinleri: sudo ve sudoers](http://www.youtube.com/watch?v=YSSIm0g00m4)  

Bazı haklar saklıdır. Lisans koşullarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) inceleyebilirsiniz. 

---

