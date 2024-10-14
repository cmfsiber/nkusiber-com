---
title: "Kısım 10 - Görev Zamanlama"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---

# 10. Kısım - Görev Zamanlama

* [Tamamlayıcı video](https://youtu.be/ktjabe8enxU)

## Giriş

Linux, zamanlanmış görevler çalıştırmak için zengin bir özellik seti sunar. İyi bir sistem yöneticisinin temel niteliklerinden biri, işleri sizin yerinize bilgisayarın yapmasını sağlamaktır (bu bazen tembellik olarak yanlış yorumlanır!). İyi yapılandırılmış zamanlanmış görevler, sunucunuzun sorunsuz çalışmasını sağlamak için kritik öneme sahiptir.  

Zaman tabanlı görev zamanlayıcı olan [cron(8)](https://linux.die.net/man/8/cron), Linux sistem yöneticileri tarafından en çok kullanılan araçtır. Unix System V'den bu yana büyük ölçüde aynı formda var olmuş ve yaygın olarak kullanılan standart bir sözdizimine sahiptir.

### Tek seferlik görevleri zamanlamak için at kullanma

Ubuntu'da iseniz, öncelikle _at_ paketini yüklemeniz gerekecek.

```bash
sudo apt update
sudo apt install at
```

`at` komutunu kullanarak gelecekte belirli bir zamanda çalışacak bir seferlik bir görev zamanlayacağız.

Öncelikle, terminalimizin standart girişe bağlı dosya adını yazdıralım (Linux'ta her şey bir dosyadır, terminaliniz bile!). Gelecekte bir noktada terminalimize bir mesaj göndereceğiz ve bu da bize _at_ ile görev zamanlamanın nasıl çalıştığını gösterecek.

```bash
vagrant@ubuntu2204:~$ tty
/dev/pts/0
```

Şimdi, terminalimize 1 dakika içinde bir selamlama mesajı göndermek için bir komut zamanlayacağız.

```bash
vagrant@ubuntu2204:~$ echo 'echo "Merhaba $USER!" > /dev/pts/0' | at now + 1 minutes
warning: commands will be executed using /bin/sh
job 2 at Sun May 26 06:30:00 2024
```

Bir süre sonra, terminalde selamlama mesajı görüntülenmelidir.

```bash
...
vagrant@ubuntu2204:~$ Merhaba vagrant!
```

Tek seferlik görevler için `at` kullanımı yaygın olmasa da, ihtiyaç duyduğunuzda artık nasıl yapılacağını biliyorsunuz. Bir sonraki bölümde, zaman tabanlı görevleri cron ve crontab kullanarak nasıl zamanlayacağımızı öğreneceğiz.

_Daha derinlemesine bilgi için [ek okumalar](#further-reading) bölümündeki ilgili makalelere göz atın._

### Görevleri zamanlamak için crontab kullanma

Linux'ta, cron aracılığıyla zamanlanmış görevlerle etkileşimde bulunmak için `crontab` komutunu kullanırız. Her kullanıcı, kök kullanıcı da dahil olmak üzere, kendi kullanıcı haklarıyla çalışan görevler zamanlayabilir.

Kullanıcınızın crontab dosyasını görüntülemek için:

```bash
vagrant@ubuntu2204:~$ crontab -l
no crontab for vagrant
```

Eğer daha önce bir crontab dosyası oluşturmadıysanız, muhtemelen henüz bir dosyanız olmayacaktır. Şimdi bir cron görevi oluşturarak nasıl çalıştığını anlayalım.

`crontab -e` komutuyla ilk cron görevinizi oluşturun. Ubuntu'da, ilk kez bir crontab düzenliyorsanız bir düzenleyici seçmeniz istenecektir:

```bash
vagrant@ubuntu2204:~$ crontab -e
no crontab for vagrant - using an empty one

Select an editor.  To change later, run 'select-editor'.
  1. /bin/nano        <---- easiest
  2. /usr/bin/vim.basic
  3. /usr/bin/vim.tiny
  4. /bin/ed

Choose 1-4 [1]: 2
```

Tercih ettiğiniz düzenleyiciyi seçin ve _Enter_ tuşuna basın.

Dosyanın altına şu cron görevini ekleyin, ardından kaydedip çıkın:

```bash
* * * * * echo "Merhaba dünya!" > /dev/pts/0
```

> NOT: `/dev/pts/0` dosya yolunun, yukarıdaki [tty](#using-at-to-schedule-oneshot-tasks) komutuyla görüntülenen yolla eşleştiğinden emin olun.

Yüklediğiniz crontab dosyasını tekrar görüntüleyin:

```bash
vagrant@ubuntu2204:~$ crontab -l
* * * * * echo "Merhaba dünya!" > /dev/pts/0
```

Bu cron görevi, her dakika terminalinize "Merhaba dünya!" mesajını yazacaktır. Birkaç dakika bekleyin ve çıktıyı inceleyin:

```bash
vagrant@ubuntu2204:~$ Merhaba dünya!
Merhaba dünya!
Merhaba dünya!
...
```

Görevi kaldırmak istediğinizde:

```bash
crontab -r
```

### Crontab sözdizimini anlama

Crontab sözdizimi şu şekildedir:

```
* * * * * çalıştırılacak komut
- - - - -
| | | | |
| | | | ----- Haftanın günü (0 - 7) (Pazar=0 veya 7)
| | | ------- Ay (1 - 12)
| | --------- Ayın günü (1 - 31)
| ----------- Saat (0 - 23)
------------- Dakika (0 - 59)
```

Kısa yollar için kullanılan operatörler:

| Sembol | Açıklama                                     |
|--------|-----------------------------------------------|
| *      | Joker karakter, tüm olası zaman aralıklarını belirtir |
| ,      | Virgülle ayrılmış birden fazla değeri listeler |
| -      | İki sayı arasında aralık belirtir             |
| /      | Periyodik aralık belirtir                    |

Farklı ifadeleri denemek için [crontab.guru](https://crontab.guru/) sitesini kullanabilirsiniz.

