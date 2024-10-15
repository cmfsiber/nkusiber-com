---
title: "Kısım 03 - Güç Deliği!"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---
# 3. Kısım - Güç Deliği!

* [Ders videosu](https://youtu.be/B6fDvmmh2_Q)

## GİRİŞ

Sunucunuza sıradan bir kullanıcı olarak giriş yapıyor olabilirsiniz, ancak muhtemelen [root kullanıcısının bir Linux sisteminde en güçlü kullanıcı](https://www.ssh.com/academy/pam/root-user-account#what-is-a-root-user?) olduğunun farkındasınız. Bu yönetici veya "süper kullanıcı" hesabı çok güçlüdür ve komutlarda yapılacak bir yazım hatası sunucunuzu çökertme potansiyeline sahiptir. Bir sistem yöneticisi olarak hem önemli hem de uzaktaki sistemlerle çalıştığınızdan, bu tür hatalardan kaçınmak *Çok İyi Bir Fikir*dir.

Eskiden sistem yöneticileri üretim sistemlerine `root` olarak giriş yapardı, ancak günümüzde doğrudan `root` ile giriş yapılmasını engellemek veya sınırlandırmak artık yaygın bir "En İyi Uygulama" (best practice) olarak kabul edilir. Bunun yerine, belirli güvenilir kullanıcılara `sudo` komutuyla root’a özel komutları çalıştırma yetkisi verilir.

## BUGÜNKÜ GÖREVLERİNİZ

* `sudo` kullanıcınızın şifresini değiştirin
* Host adını değiştirin
* Zaman dilimini değiştirin

[Demoya göz atın](https://asciinema.org/a/619818)

## YEREL DEĞİŞİKLİKLER VE EVRENSEL DEĞİŞİKLİKLER

**Evrensel**: Her kullanıcının erişebileceği programlar/ortamlar, sistem genelinde kullanılır. Evrensel değişiklikler tüm kullanıcıları etkiler.

**Yerel** veya **Kullanıcıya Özel**: Sadece belirli bir kullanıcının çalıştırabileceği programlar/ortamlar. Yerel değişiklikler yalnızca ilgili kullanıcıyı etkiler.

## KİMSİNİZ VE NE YAPABİLİRSİNİZ?

Linux sisteminde 3 tür kullanıcı vardır:

* `root` - Sistemdeki her seviyede komut çalıştırabilen güçlü süper kullanıcı. Hem evrensel hem de yerel değişiklikleri yapabilir.
* `sudoers` - `sudo` kullanmasına izin verilen normal kullanıcılar. Sistem seviyesinde bazı ya da tüm evrensel değişiklikleri yapabilirler. Genellikle root ile aynı yetkilere sahip en az bir `sudoer` bulunur, ancak diğer `sudoer`ların yetkileri değişiklik gösterebilir.
* `normal kullanıcılar` - Sistemi kullanabilirler, ancak sadece yerel değişiklikler yapabilirler. Yani yalnızca kendi dosya/dizinleri ve çevresel değişkenleriyle ilgilenebilirler.

Kullanıcılar ve yetkileri hakkında 13. kısım ve 14. kısım derslerinde daha ayrıntılı bilgi vereceğiz.

## ROOT KULLANIMINI DURDURUN

[Popüler VPS sağlayıcılarıyla](https://linuxupskillchallenge.org/00-VPS-big/) bir sanal makine (VM) oluşturduysanız, `root` hesabı zaten "devre dışı"dır ve varsayılan kullanıcınız (örneğin ubuntu, azureuser vb.) `sudo` yetkisine sahiptir.

Ancak, gerçekten `root` kullanmak isterseniz, bunu [AWS](https://tecadmin.net/how-to-enable-ssh-as-root-on-aws-ubuntu-instance/), [Azure](https://stackoverflow.com/questions/24313562/root-login-ubuntu-vm-on-azure) veya [GCP](https://cloud.google.com/compute/docs/connect/root-ssh) üzerinde yapmanın yolları vardır. **Ama bunu kendi sorumluluğunuzda yapın!**

Eğer bir VM’yi [yerel olarak](https://linuxupskillchallenge.org/00-Local-Server/) veya [diğer VPS sağlayıcılarıyla](https://linuxupskillchallenge.org/00-VPS-small/) oluşturduysanız, muhtemelen `root` kullanıcınız zaten kullanılabilir durumdadır.

Root kullanımını bırakın. Kılavuzları izlediyseniz, bir normal kullanıcı oluşturup bunu sudoers grubuna eklemiş olmalısınız:

```bash
adduser nkusiber
usermod -a -G sudo nkusiber
```

Bir kullanıcıyı `sudo` yetkisine sahip bir gruba eklemek en kolay yoldur, çünkü `sudo` grubu Ubuntu’da oldukça yaygındır. `/etc/sudoers` dosyasını `visudo` komutuyla düzenleyerek de bu işlem yapılabilir.

Artık bu yeni kullanıcıyla giriş yapın. Giriş yaptığınız kullanıcı adını görüntülemek için `whoami` komutunu kullanın.

## ŞİFRE DEĞİŞTİRME

Eğer giriş yapmak için bir şifre kullanıyorsanız (açık anahtar yerine), şimdi bu şifrenin çok güçlü ve benzersiz olduğundan emin olmanın tam zamanı - yani en az 10 alfanümerik karakter içermeli. Özellikle hala `root` kullanıyorsanız bu çok önemlidir.

Şifrenizi değiştirmek için `passwd` komutunu kullanın.

Yeni ve güvenli bir şifre düşünün, ardından `passwd` yazıp "Enter" tuşuna basın. Mevcut şifrenizi girin, ardından belirlediğiniz yeni şifreyi girip onaylayın - ve bunu bir yere YAZIN. Üretim sistemlerinde elbette açık anahtarlar ve/veya iki faktörlü kimlik doğrulama daha uygun olacaktır.

## GÜÇLENDİRME ÜZERİNE BİR NOT

Sunucunuz, güvenlik güncellemelerinin güncel olması ve güçlü, benzersiz şifreler veya açık anahtarların kullanılması sayesinde korunur. Dünyaya açık ve sürekli saldırı altında olma ihtimaline rağmen, tamamen güvenli olmalıdır.

Birkaç kısım sonra bu saldırıları nasıl görebileceğimize bakacağız, ancak şimdilik "SSH güçlendirme" hakkında okumak iyi olsa da, varsayılan portu değiştirme ve `fail2ban` gibi önlemler öğrenirken gereksizdir ve şimdilik güvenliğiniz için yeterlidir.

## SUDO’NUN GÜCÜ

* Aşağıdaki "Kaynaklar" bölümündeki bağlantılarla sudo'nun nasıl çalıştığını anlayın
* cat /etc/shadow komutunu deneyin, dosyanın içeriğini görebiliyor musunuz?
* Bu dosya, şifrelerin hashlenmiş hallerini içerir. Yetkisiz kullanıcıların görmemesi gereken hassas bir dosyadır.
* Şimdi aynı komutu sudo ile deneyin: sudo cat /etc/shadow
* `reboot` komutunu çalıştırmayı ve ardından sudo ile (sudo reboot) yeniden denemeyi deneyin.

Yeniden bağlandıktan sonra:

* Sunucunuzun gerçekten tamamen yeniden başladığını doğrulamak için uptime komutunu kullanın.
* Kullanıcı adını filtreleyerek (ör. snori74) giriş geçmişini görmek için last komutunu çalıştırın. Eğer ilk kez root olmayan bir kullanıcıyı kullanıyorsanız, yalnızca bir kayıt göreceksiniz (yani last snori74).
* Şimdi bunu root olarak yaptığınız girişlerle karşılaştırın: last root.
* Daha da iyisi, root için başarısız giriş denemelerini görmek üzere sudo lastb komutunu çalıştırın.
* "Root" moduna tamamen geçmek için sudo -i komutunu test edin. Bu, bir dizi komutu root olarak çalıştırmanız gerektiğinde faydalıdır. İmlecinizin değiştiğine dikkat edin.
* Kendi normal “yönetici” hesabınıza geri dönmek için exit veya logout yazın.
* sudo'nun son kaç kez kullanıldığını görmek için: sudo journalctl -e /usr/bin/sudo komutunu kullanın.

Normalde `sudo` komutu çalıştırıldığında kimliğinizi şifrenizle yeniden doğrulamanız istenir. Ancak bu, sudoers yapılandırma dosyasında değiştirilebilir ve şifre istemesi engellenebilir. 13. Gün dersinde bu konuya daha ayrıntılı değiniyoruz.

# YÖNETİMSEL GÖREVLER

Sunucunuzda yapabileceğiniz birçok işlemi detaylandıracağız, ancak burada `sudo` gerektiren bazı basit yönetimsel görev örnekleri verilmiştir.

İsterseniz, sunucunuzun adını şimdi değiştirebilirsiniz. Geleneksel olarak bunu `/etc/hostname` ve `/etc/hosts` dosyalarını düzenleyip sunucuyu yeniden başlatarak yapardınız. Ancak daha modern ve önerilen yöntem, `hostnamectl` komutunu kullanmaktır:

```bash
sudo hostnamectl set-hostname mylittlecloudbox
```

Yeniden başlatma gerekmez, ancak yeni adı komut isteminde görmek istiyorsanız, bash ile yeni bir oturum açın (veya oturumu kapatıp tekrar giriş yapın, aynı etkiyi sağlar).

Bir bulut sunucusunda, yeniden başlattıktan sonra hostname’in değiştiğini fark edebilirsiniz. Bunu önlemek için /etc/cloud/cloud.cfg dosyasını düzenleyin ve "preserve_hostname" satırını şu şekilde değiştirin:

```
preserve_hostname: true
```

Ayrıca sunucunuzun kullandığı zaman dilimini değiştirmeyi düşünebilirsiniz. Varsayılan olarak, bu muhtemelen UTC (yani GMT) olacaktır, bu da küresel sunucular için uygundur. Ancak sunucunun bulunduğu veya sizin/hizmet merkezinizin olduğu saat dilimini de ayarlayabilirsiniz. Bir şirket için bu, dikkatle alınması gereken bir karar olsa da, şimdilik istediğiniz gibi değiştirebilirsiniz.

Önce geçerli ayarı kontrol edin:

timedatectl

Ardından mevcut saat dilimlerinin listesini alın:

timedatectl list-timezones

Son olarak, birini seçin:

sudo timedatectl set-timezone Australia/Sydney

Onaylamak için tekrar çalıştırın:

timedatectl

Bunun başlıca pratik etkileri:

1. Zamanlanmış görevlerin zamanı
2. /var/log altında tutulan günlük dosyalarının zaman damgalamaları

Bir değişiklik yaparsanız, tarih ve saat kayıtlarında doğal olarak bir "zıplama" olacaktır.

## BÜYÜK GÜÇ, BÜYÜK SORUMLULUK GETİRİR
Bir Linux sistem yöneticisi olarak, üzerinde az kontrolünüzün olduğu müşteri veya özel sistemlerde çalışabilirsiniz ve çoğu varsayılan olarak her şeyi root olarak yapmaya eğilimlidir. Bu tür sistemlerde güvenli bir şekilde çalışabilmek için komutları uygulamadan önce iki kez kontrol etmeniz çok önemlidir.

Öte yandan, tam kontrol sahibi olduğunuz sistemlerde, kendiniz (ve diğer yöneticiler için) sudo kullanma yetkisine sahip "normal" bir hesap oluşturmanız önerilir. Bu Ubuntu’da standarttır, ancak Debian, CentOS ve RHEL gibi diğer popüler sunucu dağıtımlarıyla da kolayca yapılandırılabilir.

Yine de küresel değişiklikler yapmadan önce gerekli önlemleri almak çok önemlidir. Yanlışlıkla sistemden kilitlenmeyi veya başka sorunları önlemek için test ortamı kullanmak, yazım hatalarını kontrol etmek ve günlük dosyalarına göz kulak olmak, zamanla alışkanlık haline gelecektir.

How To Edit the Sudoers File https://www.digitalocean.com/community/tutorials/how-to-edit-the-sudoers-file
Hardening SSH https://www.digitalocean.com/community/tutorials/how-to-edit-the-sudoers-file
SSH Tunneling https://medium.com/@jasonrigden/hardening-ssh-1bcb99cd4cef
How To Set Up Multi-Factor Authentication for SSH on Ubuntu 20.04 https://www.digitalocean.com/community/tutorials/how-to-set-up-multi-factor-authentication-for-ssh-on-ubuntu-20-04

## "sudo -i" ve "sudo -s" arasındaki fark nedir?

Hem sudo -i hem de sudo -s komutları, bir kullanıcıya Unix tabanlı bir sistemde root ayrıcalıkları kazandırır. Ancak, işlevleri açısından bazı farklar vardır.

    sudo -i, "sudo interactive" anlamına gelir ve root kullanıcısı için yeni bir oturum kabuğu açar. Bu, root kullanıcısının ev dizini ve kabuk yapılandırma dosyalarıyla birlikte yeni bir ortam oluşturur. Root kullanıcısı olarak doğrudan giriş yapmaya benzer ve bu kabuktan çalıştırılan tüm komutlar root ayrıcalıklarına sahip olur.
    sudo -s, "sudo shell" anlamına gelir ve root için yeni bir kabuk açar, ancak yeni bir oturum açmaz. Mevcut kullanıcının ortamını veya kabuk yapılandırma dosyalarını değiştirmez. Bu kabuktan çalıştırılan komutlar root yetkilerine sahip olur, ancak ortam hala mevcut kullanıcıya ait olur.

Özetle, sudo -i daha güçlüdür ve root’un tam ortamıyla yeni bir kabuk açar, sudo -s ise yalnızca mevcut ortamla root yetkilerine sahip bir kabuk açar.

KAYNAKLAR

    This cartoon explains it nicely! http://xkcd.com/149/
    How to find last logged in users in Linux https://ostechnix.com/how-to-find-last-logged-in-users-in-linux/
    Sudo in Ubuntu https://help.ubuntu.com/community/RootSudo
    How to use "sudo" https://www.howtoforge.com/tutorial/sudo-beginners-guide/
    This is how password cracking is done https://null-byte.wonderhowto.com/how-to/crack-shadow-hashes-after-getting-root-linux-system-0186386/
    Password-less SSH login https://linuxize.com/post/how-to-setup-passwordless-ssh-login/
