---
title: "Kısım 06 - \"vim\" ile Düzenleme"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---
# 6. Kısım - "vim" ile Düzenleme

* [Tamamlayıcı video](https://youtu.be/dNd3BvJNDIo)

## GİRİŞ

Linux'un temelinde basit metin dosyaları bulunur, bu yüzden bu dosyaları düzenlemek bir sistem yöneticisi için önemli bir beceridir. Başlangıç seviyesindeki kullanıcılar için tasarlanmış birçok basit metin düzenleyici vardır. En yaygın örneklerden bazıları nano ve pico'dur. Bu düzenleyiciler, sanki 1980'lerde DOS için yazılmış gibi görünür, ancak “kolayca çözülebilir” bir yapıya sahiptir.

Gerçek bir Sistem Yöneticisi™ ise vi kullanır – bu, varsayılan olarak her zaman kurulu olan düzenleyicidir ve bugün onunla çalışmaya başlayacaksınız.

Bill Joy, Vi'yi 1970'lerin ortalarında yazdı ve bugünkü odak noktamız olan modern Vim, 20 yıldan fazla bir geçmişe sahip olmasına rağmen hâlâ komut satırı sunucularında standart düzenleyici konumundadır. Ayrıca, programcılar ve bazı yazarlar arasında da sadık bir takipçi kitlesine sahiptir. Vim, aslında [Vi IMproved](https://vimhelp.org/intro.txt.html) ifadesinin bir kısaltmasıdır ve Vi’nin doğrudan bir devamıdır.

Çoğu zaman vi komutunu yazdığınızda, aslında vim başlatılır. Bunu doğrulamak için şu komutu çalıştırın:

bash
vi --version

Eğer sisteminizde vi komutu aslında vim'e [symlink](19.md#two-sorts-of-links) edilmişse, benzer bir çıktı göreceksiniz:

bash
user@testbox:~$ vi --version
VIM - Vi IMproved 8.2 (2019 Dec 12, compiled Oct 01 2021 01:51:08)
Included patches: 1-2434
Extra patches: 8.2.3402, 8.2.3403, 8.2.3409, 8.2.3428
Modified by team+vim@tracker.debian.org
Compiled by team+vim@tracker.debian.org
...

## BUGÜNKÜ GÖREVLERİNİZ

* vimtutor çalıştırın  
* Vim ile bir dosya düzenleyin

### VIM YÜKLÜ DEĞİLSE NE YAPMALIYIM?

Bu ders, sisteminizde vim'in yüklü olduğunu varsayar, ancak bazı durumlarda yüklü olmayabilir. Eğer aşağıdaki gibi bir hata alırsanız:

bash
user@testbox:~$ vim
-bash: vim: command not found

#### SEÇENEK 1 - VIM'İ ALIAS İLE TANIMLAYIN

Bir seçenek, aşağıdaki komutlarda vim yerine vi kullanmaktır. Vim, Vi ile geriye dönük uyumludur, bu yüzden tüm alıştırmalar her iki düzenleyici için de aynı şekilde çalışacaktır. İşleri kolaylaştırmak için vim komutunu vi ile alias olarak tanımlayabiliriz:

bash
echo "alias vim='vi'" >> ~/.bashrc
source ~/.bashrc

#### SEÇENEK 2 - VIM'İ KURUN

Bir diğer seçenek ise (birçok sistem yöneticisinin yapacağı gibi) vim'i kurmaktır.

Ubuntu'da vim'i kurmak için sistem paket yöneticisini kullanın:

bash
sudo apt install vim

Not: [Ubuntu Server LTS](00-VPS-big.md#intro), Linux Upskill Challenge için önerilen dağıtım olduğu için, diğer Linux dağıtımlarında vim kurulumu bu dersin kapsamı dışındadır. Ancak yukarıdaki komut, Debian tabanlı dağıtımlarda (Mint, Debian, Pop!_OS gibi) çalışmalıdır. Debian dışı dağıtımlar için küçük bir web araması, diğer paket yöneticileriyle vim'in nasıl kurulacağını bulmanıza yardımcı olabilir.

## BİLMENİZ GEREKEN İKİ ŞEY

* İki farklı "mod" vardır ve her biri çok farklı davranır.  
* Hangi modda olduğunuzu gösteren belirgin bir işaret yoktur!

İki mod: "normal mod" ve "insert mod" olarak adlandırılır. Yeni başlayanlar için şunu hatırlamanız yeterlidir:

"Normal moda dönmek için Esc tuşuna iki veya daha fazla kez basın."

"Normal mod", komutları girmek için kullanılırken "insert mod", metin yazmak için kullanılır.

## TALİMATLAR

Öncelikle düzenlemek için bir metin dosyası alın. /etc/services dosyasının bir kopyası işinizi görecektir:

bash
cd
pwd
cp -v /etc/services testfile
vim testfile

Bu noktada dosya ekranda açılacak ve "normal mod"da olacaksınız. Nano'nun aksine, ekranda hiçbir menü yoktur ve nasıl çalıştığı pek açık değildir!

Önce bir veya iki kez Esc tuşuna basarak normal moda geçtiğinizden emin olun ve ardından :q! yazıp Enter tuşuna basın. Bu, değişiklikleri kaydetmeden çıkış yapar – bu, ilk başlarda çok önemli bir beceridir! Şimdi tekrar girin ve vim'in ne kadar güçlü ve tehlikeli olduğunu keşfedin, ardından yine kaydetmeden çıkın:

bash
vim testfile

_h_, _j_, _k_ ve _l_ tuşlarıyla hareket edin (bu, geleneksel vi yöntemi) ve ardından ok tuşlarını deneyin. Eğer ok tuşları çalışırsa, onları kullanmakta özgürsünüz; ancak bu _hjkl_ tuşlarını hatırlayın çünkü bir gün sadece geleneksel vi'nin olduğu bir sistemde olabilirsiniz ve ok tuşları çalışmayabilir.

Dosyada gezinmeyi deneyin. Ardından Esc Esc :q! ile çıkın.

Bu temel becerileri öğrendiğinize göre, daha gelişmiş işlemler yapalım:

bash
vim testfile

Bu sefer dosyada birkaç satır aşağı inin ve sırasıyla 3, 3, d ve d tuşlarına basın – aniden dosyanın 33 satırı silinecek!

Neden? Çünkü normal modda _33dd_, "33 satırı sil" anlamına gelir. Şimdi hâlâ normal moddasınız, bu yüzden _u_ tuşuna basın – son yaptığınız işlemi geri aldınız! Harika, değil mi?

Artık vim'de yeni başlayanlar için üç temel numarayı biliyorsunuz:

* Esc Esc her zaman sizi "normal moda" geri getirir  
* Normal moddayken :q! komutu, yaptığınız hiçbir şeyi kaydetmeden çıkış yapar  
* Normal moddayken u komutu, son işlemi geri alır  

Artık bazı yararlı şeyler yapabilirsiniz:

* Bir şeyler bulmak: Normal moddayken G tuşuna basarak dosyanın sonuna, gg tuşlarıyla başına gidin. "sun" kelimesini aramak için /sun yazın ve Enter'a basın, ardından tüm eşleşmeleri görmek için _n_ tuşuna basın. Başına dönün (gg) ve "_Apple_" veya "_Microsoft_" gibi kelimeleri arayın.  
* Kesip yapıştırmak: Başına dönün (gg) ve yorum satırlarının ilk birkaç satırını kesin. 11 satırı silmek için _11dd_ yazın, ardından _P_ ile geri yapıştırın. Aynı satırları başka bir yere de yapıştırın.  
* Metin eklemek: Dosyada bir yere gidin ve _i_ tuşuna basarak "insert mod"a geçin. Yazmaya başlayın ve işiniz bittiğinde Esc Esc ile normal moda dönün.  
* Değişiklikleri kaydetmek: Normal moddayken :w yazın ve vim açık kalsın veya :wq ile kaydedip çıkın.

Bu, vim hakkında öğrenmeniz gereken minimum şeydir. Ancak öğrenmek isterseniz çok daha fazlası var. Bir sonraki adım olarak vimtutor çalıştırın ve resmi Vim eğitimini takip edin. İlk seferde yaklaşık 30 dakika sürer. 1-2 hafta boyunca her gün vimtutor ile alıştırma yaparsanız temel becerileriniz sağlamlaşır.

Not: Alıştırmalar için vim'i vi olarak tanımladıysanız, şimdi vim'i kurmanız iyi olabilir çünkü vimtutor komutunu sağlar. Vim yüklendikten sonra vim içinde :help vimtutor komutunu çalıştırarak yardımı ve ipuçlarını görebilirsiniz.

Eğer gerçekten sistem yöneticisi olmayı hedefliyorsanız, artık tüm düzenlemelerinizi vim (veya vi) ile yapmaya karar vermeniz önemli.

Son olarak, [Vi vs. Emacs](https://en.wikipedia.org/wiki/Editor_war) tartışmasına da rastlayabilirsiniz. Bu, programcılar için bir rekabettir, sistem yöneticileri için değil. Öğrenmeniz gereken vi/vim'dir.

## NEDEN SADECE NANO KULLANAMIYORUM?

* Çoğu profesyonel durumda, başkalarının sistemlerinde çalışacaksınız ve sistemlerin kararlılığı konusunda çok hassas olacaklardır. Kendi favori düzenleyicinizi yükleme yetkiniz olmayabilir.  
* Ancak vi, Unix veya Linux sistemlerinde her zaman kurulu olur. Tek kartlı IoT cihazlarından süper bilgisayarlara kadar her yerde bulunur. POSIX ve [Tek Unix Spesifikasyonu](https://en.wikipedia.org/wiki/POSIX) tarafından gereklidir.  
* Ayrıca bu, Linux profesyonelleri için bir [şibboleth](https://en.wikipedia.org/wiki/Shibboleth) gibidir. Bir görüşmede vi/vim ile yeni başladığınızı söylemek kabul edilebilir, ancak ondan nefret ettiğinizi söylemek risklidir – özellikle de [nasıl çıkılacağını](https://github.com/hakluke/how-to-exit-vim) hatırlamıyorsanız.

Eğer sadece kendi sistemlerinizde çalışıyorsanız, nano veya pico gibi düzenleyicileri tercih etmekte özgürsünüz.

## EK GÖREV

Vi veya vim konusunda zaten deneyimliyseniz, bugün bir saat ayırarak ~/.vimrc dosyanız üzerinden bazı özelleştirmeler yapın. Aşağıdaki bağlantı özellikle sistem yöneticileri için hazırlanmıştır:

* [Vim'den Daha Fazla Verim Almak](https://www.linux.com/news/sysadmin-sysadmin-getting-more-out-vim)

## KAYNAKLAR

* [Vim Neden _hjkl_ Tuşlarını Ok Tuşları Olarak Kullanır?](http://www.catonmat.net/blog/why-vim-uses-hjkl-as-arrow-keys/)  
* [Grafiksel Vi-Vim Yardım Kartı ve Eğitimi](http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html)  
* [Vi - Vim Eğitimi](http://www.youtube.com/watch?v=71YTkxUNwmg) (video)  
* [Vim / Vi'de Kopyalama, Kesme ve Yapıştırma](https://linuxize.com/post/how-to-copy-cut-paste-in-vim/)  

Bazı haklar saklıdır. Lisans şartlarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) kontrol edin.

