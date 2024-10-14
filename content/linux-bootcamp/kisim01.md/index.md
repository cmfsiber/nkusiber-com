---
title: "Kısım 01 - Sunucunuzu Tanıyın"
draft: false
date: 2024-10-13
featureimagelocal: "/static/img/gnu-love.png"
authors:
 - "yigit-altinay"
---

# 1. Kısım - Sunucunuzu Tanıyın

* [Ders videosu](https://youtu.be/xaDAB0vbIr4)

## GİRİŞ

En son Ubuntu Server LTS (Uzun Vadeli Destek) sürümünü çalıştıran bir uzak sunucunuz olmalı. Bu sunucuyu yalnızca siz yöneteceksiniz. Tam donanımlı bir Linux sunucu yöneticisi olmak için farklı Linux sürümleriyle çalışmaya alışmalısınız, ancak şimdilik Ubuntu iyi bir başlangıç olacaktır.

Komut satırında rahat çalışmayı öğrendiğinizde, bu becerilerinizi sadece tüm Linux dağıtımlarında değil, aynı zamanda Android, macOS, OpenBSD, Solaris ve IBM AIX gibi sistemlere de aktarabilirsiniz. Kurs boyunca Linux üzerinde çalışacağız, ancak ele aldığımız konuların çoğu [UNIX İşletim Sistemi](https://youtu.be/tc4ROCJYbm0) türevleri için de geçerlidir. Ana farklar, Gnome, Unity, KDE gibi grafik arayüzlerdedir – ancak bu kurs boyunca grafik arayüz kullanmayacağız.

## BU KISIMDAKİ GÖREVLERİNİZ

* SSH istemcisi kullanarak sunucunuza bağlanın ve giriş yapın.  
* Sunucunun durumunu kontrol etmek için birkaç basit komut çalıştırın - [demo](https://asciinema.org/a/619479)

## SSH İSTEMCİSİ KULLANMA

Eskiden uzak erişim *telnet* protokolü ile yapılırdı, ancak artık çok daha güvenli olan SSH (Secure SHell) protokolü kullanılıyor. **Sunucunuz yerel bir sanal makine (VM) veya WSL ise, sunucu konsolunu kullanarak bu adımı atlayabilirsiniz.** SSH’yi sunucu tarafında 3. kısımda ayrıntılı olarak inceleyeceğiz, ancak SSH istemcisi kullanmak temel bir sistem yöneticisi becerisidir.  

### macOS ve Linux’te

macOS’te **Terminal.app** ile komut satırına erişebilirsiniz. Uygulamalar -> Yardımcı Programlar dizinindedir. Linux dağıtımlarında, terminali genellikle "Uygulamalar -> Sistem -> Terminal" altında veya `Ctrl+Alt+T` kısayoluyla açabilirsiniz.

SSH istemcisini şu şekilde kullanabilirsiniz:

```bash
ssh user@<ip adresi>
```

Örneğin:

```bash
ssh support@192.123.321.99
```

Sunucuda SSH anahtarları kullanılıyorsa, kimlik doğrulamak için özel anahtarınızı belirtmeniz gerekir:

```bash
ssh -i ~/.ssh/id_rsa support@192.123.321.99
```

Bağlantıları kolaylaştırmak için `.ssh/config` dosyasını yapılandırabilirsiniz. Daha fazla bilgi için aşağıdaki **EXTENSION** bölümüne bakın.

### Windows’ta

Windows 10’da SSH istemcisini [etkinleştirmeniz](https://learn.microsoft.com/en-us/windows/terminal/tutorials/ssh) gerekebilir. Alternatif olarak, [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) veya [MobaXterm](https://mobaxterm.mobatek.net/) gibi araçları kullanabilirsiniz. Ayrıca [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) yükleyerek tam bir Linux ortamına erişebilir ve SSH’yi kullanabilirsiniz.

Biz PuTTY tercih edeceğiz.

İlk kez bağlandığınızda sunucu anahtarını önbelleğe almak isteyip istemediğiniz sorulacaktır. **Evet** deyin.

SSH istemcinizi özelleştirmek önemlidir. Siyah üzerine yeşil veya beyaz üzerine siyah gibi renklerle denemeler yapabilirsiniz. Uzaktan oturum ile masaüstünüz arasında metin kopyalamayı öğrenmek de faydalı olacaktır.

Çıkış yapmak için `exit` yazabilir veya terminali kapatabilirsiniz.

## SUNUCUNUZA GİRİŞ YAPIN

Giriş yaptıktan sonra, komut isteminin `$` ile bittiğini göreceksiniz. Bu, sıradan bir kullanıcıyı gösterir. Tam yetkiye sahip **Root** kullanıcısı için bu işaret `#` olur. Root kullanıcısı hakkında 3. kısımda daha fazla bilgi edineceğiz.

## SUNUCU HAKKINDA GENEL BİLGİLER

`lsb_release -a` komutuyla kullandığınız Linux sürümünü kontrol edin. Alternatif olarak, `cat /etc/os-release` komutunu kullanabilirsiniz.

`uname -a` komutu, sistem hakkında bilgi verir. `uptime` komutu, sunucunun ne kadar süredir çalıştığını gösterir. `whoami` ile giriş yaptığınız kullanıcı adını, `who` ile aktif oturumları ve `w` komutuyla bu oturumların ne yaptığını görebilirsiniz.

## DONANIM BİLGİLERİ

`lshw`, sunucunun donanım yapılandırmasını gösterir. Diğer yararlı komutlar:  

- `lscpu` – CPU ve mimari bilgilerini listeler  
- `lsblk` – Blok aygıtlarını listeler  
- `lspci` – PCI aygıtlarını listeler  
- `lsusb` – USB aygıtlarını listeler  

## BELLEK VE CPU KULLANIMI

`free -h` komutu, sistemdeki bellek (RAM) kullanımını gösterir. `vmstat` bellek istatistikleri sunar.

`top`, sistemdeki süreçleri ve kaynak tüketimini gösteren bir görev yöneticisi gibidir. `htop` ise daha interaktif bir versiyondur.

## DİSK KULLANIMINI ÖLÇME

`df -h` komutuyla [disk alanı kullanımını](https://www.man7.org/linux/man-pages/man1/df.1.html), `du -h` ile dizin boyutlarını kontrol edebilirsiniz.

## AĞ KULLANIMINI ÖLÇME

Ağ arayüzlerini görmek için `ifconfig` veya `ip address` komutlarını kullanın. Bant genişliğini izlemek için `ifstat` veya `sudo iftop -i eth0` komutları faydalıdır.

## EKLER

Bu konular size kolay geldiyse, aşağıdaki bağlantıları inceleyin:  

- [Swap alanı nedir?](https://help.ubuntu.com/community/SwapFaq)  
- [Linux’ta bellek yetersizliği nasıl yönetilir?](https://www.oracle.com/technical-resources/articles/it-infrastructure/dev-oom-killer.html)  
- [Linux CPU kullanımı nasıl ölçülür?](https://www.cyberciti.biz/tips/how-do-i-find-out-linux-cpu-utilization.html)

## KAYNAKLAR

- [CENTOS ve Ubuntu Karşılaştırması](http://serverfault.com/questions/53954/centos-vs-ubuntu)  
- [SSH kullanımı için başlangıç rehberi](https://www.youtube.com/watch?v=qWKK_PNHnnA)  
- [Donanım bilgileriniz Linux ile uyumlu mu?](https://linux-hardware.org/)  
- [Linux’ta Yük Ortalaması Nedir?](https://www.digitalocean.com/community/tutorials/load-average-in-linux)

---

türkçe kılavuz
https://github.com/pages-tr/turkce_ceviriler

inanılmaz iyi kaynak, baştan sona okunmalı
https://linux-yonetimi.veriteknik.net.tr/
