---
title: "Kısım 14 - Kimin Yetkisi Var?"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---
# 14. Kısım - Kimin Yetkisi Var?

* [Ders videosu](https://youtu.be/mBcExazxLU8)  
* [Tamamlayıcı video](https://www.youtube.com/live/2lYo_FJxQR8?feature=shared)

## GİRİŞ

Linux sistemindeki dosyaların her zaman bir "izin" seti vardır. Bu izinler, kimin erişebileceğini ve ne tür erişim sağlayabileceğini belirler. Daha önce de bu izinlerle karşılaştınız – örneğin, sıradan bir kullanıcı olarak _/var/www_ dizinine doğrudan dosya yükleyemediniz veya kök dizinde (_/_) yeni bir klasör oluşturamadınız.

Linux'un izin sistemi oldukça basittir, ancak bazı ince ve kendine özgü yönleri vardır. Bugün bu sistemin temel kavramlarına giriş yapacağız.  

**KAYNAKLAR** bölümündeki materyalleri detaylıca incelemeniz gerçekten çok faydalı olacaktır!

## BUGÜNKÜ GÖREVLERİNİZ

* Bir dosyanın sahipliğini kök kullanıcıya atayın.  
* Dosya izinlerini değiştirin.

## SAHİPLİK (Ownership)

Önce dosya sahipliğini inceleyelim. Linux'taki her dosya, bir kullanıcı ve bir grup tarafından sahiplenilir. Örneğin şu çıktıyı inceleyelim:

```bash
-rw-------  1 steve  staff  4478979  6 Feb  2011 private.txt
-rw-rw-r--  1 steve  staff  4478979  6 Feb  2011 press.txt
-rwxr-xr-x  1 steve  staff  4478979  6 Feb  2011 upload.bin
```

Bu çıktıya göre dosyalar "steve" kullanıcısına ve "staff" grubuna aittir. "steve" ya da "staff" grubuna üye olmayan diğer tüm kullanıcılar "other" (diğer) olarak kabul edilir. Bu "diğer" kullanıcılar belirli izinlere sahip olabilirler, ancak dosyalar üzerinde sahiplik hakları yoktur.  

Bir dosyanın sahipliğini değiştirmek için `chown` komutunu kullanabilirsiniz. Örneğin:  

```bash
sudo chown kullanıcı_adi dosya
```

Kullanıcı ve grup sahipliğini aynı anda değiştirmek için:  

```bash
sudo chown kullanıcı:grup dosya
```

Yalnızca grup sahipliğini değiştirmek için `chgrp` komutunu kullanabilirsiniz:  

```bash
sudo chgrp grup dosya
```

Önceki derste oluşturduğunuz yeni kullanıcılarla giriş yaparak ana dizinlerinde birkaç dosya oluşturun. Ardından bu dosyaları `ls -l` komutuyla listeleyerek sahiplik bilgilerini inceleyin.

## İZİNLER (Sembolik Gösterim)

İzinleri anlamak için `-rw-r--r--` gibi bir çıktıyı inceleyelim. (İlk `-` karakterini şimdilik yok sayalım.) Bu dizgi, dosyanın **kullanıcı** (user), **grup** (group) ve **diğer kişiler** (other) için verilen izinlerini gösterir. Bu üçlü gruba [UGO](https://acronym24.com/ugo-meaning-in-linux/) denir.  

Örneğin yukarıdaki listede:  

* **private.txt:** Sadece "steve" kullanıcısının okuma ve yazma (`rw`) izni var. Grup ve diğer kişiler için izin verilmemiş.  
* **press.txt:** "steve" ve "staff" grubu dosya üzerinde okuma ve yazma iznine sahip. Diğer herkes ise yalnızca okuma iznine sahip.  
* **upload.bin:** "steve" dosyayı okuyabilir, yazabilir ve çalıştırabilir (`rwx`). Grup ve diğer kullanıcılar ise yalnızca okuma ve çalıştırma iznine sahip.  

Bir dosyanın izinlerini değiştirmek için `chmod` komutunu kullanabilirsiniz. Örneğin, ana dizininizde `vim` ile bir metin dosyası (_tuesday.txt_) oluşturun ve içeriğini görüntüleyin:  

```bash
cat tuesday.txt
```

Dosyanın izinlerini listelemek için:  

```bash
ls -ltr tuesday.txt
```

Örnek çıktı:

```bash
-rw-rw-r-- 1 ubuntu ubuntu 12 Nov 19 14:48 tuesday.txt
```

Bu dosya, "ubuntu" kullanıcısına ve grubuna aittir. Kullanıcı ve grup dosyaya yazabilir, ancak diğer kullanıcılar yalnızca okuyabilir.

## İZİNLERİ DEĞİŞTİRME

Şimdi kullanıcı ve grubun dosyaya yazma iznini kaldırın:

```bash
chmod u-w tuesday.txt
chmod g-w tuesday.txt
```

Diğer kullanıcıların okuma iznini kaldırın:

```bash
chmod o-r tuesday.txt
```

Değişiklikleri kontrol etmek için:

```bash
ls -l tuesday.txt
```

Örnek çıktı:

```bash
-r--r----- 1 ubuntu ubuntu 12 Nov 19 14:48 tuesday.txt
```

Artık dosya, sahibi tarafından bile düzenlenemeyecek durumda. Ancak sahibi olarak, `vim` veya `nano` ile düzenleyip `:w!` komutunu kullanarak zorla kaydedebilirsiniz. İzinleri geri vermek için:

```bash
chmod u+w tuesday.txt
```

## İLERLEMENİZİ PAYLAŞIN

Kendi ana dizininizde _secret.txt_ adında bir dosya oluşturun ve kullanıcı, grup ve diğer kişiler için tüm izinleri kaldırın. Ardından dosyayı düzenlemeyi deneyin ve sonuçları gözlemleyin.

## EK BİLGİLER

Eğer bu konular size tanıdık geliyorsa, Linux ACL'lerini incelemek isteyebilirsiniz:

* [ACL Yönetimi](https://linuxconfig.org/how-to-manage-acls-on-linux)  
* [Linux Erişim Kontrol Listeleri](https://www.redhat.com/sysadmin/linux-access-control-lists)  

Ayrıca SELinux ve AppArmor konularına göz atabilirsiniz:  

* [SELinux Man Sayfası](https://manpages.ubuntu.com/manpages/impish/en/man8/selinux.8.html)  
* [SELinux Kullanıcı ve Yönetici Rehberi](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/pdf/selinux_users_and_administrators_guide/red_hat_enterprise_linux-7-selinux_users_and_administrators_guide-en-us.pdf)  
* [SELinux Kullanımı](https://craigmbooth.com/blog/selinux-for-mortals/)  
* [AppArmor ile Güvenli Ubuntu](https://www.youtube.com/watch?v=lJFxexGZ-DY)  

## KAYNAKLAR

* [Linux'ta chown Komutunu Kullanma](https://www.hostinger.com/tutorials/linux-chown-command/)  
* [chown ve chgrp Arasındaki Fark](https://unix.stackexchange.com/questions/136987/if-chown-can-change-groups-why-was-chgrp-created)  
* [Linux Dosya İzinleri Açıklaması](https://www.redhat.com/sysadmin/linux-file-permissions-explained)  
* [Dosya İzinleri ve Öznitelikleri](https://wiki.archlinux.org/title/File_permissions_and_attributes)  
* [chmod Eğitim Rehberi](http://catcode.com/teachmod/)  
* [Umask Nedir ve Nasıl Çalışır?](https://askubuntu.com/questions/44542/what-is-umask-and-how-does-it-work)  

Bazı haklar saklıdır. Lisans koşullarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) inceleyin.

---

