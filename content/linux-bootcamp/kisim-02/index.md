---
title: "Kısım 02 - Temel Gezinti"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---

# 2. Kısım - Temel Gezinti

* [Ders videosu](https://youtu.be/x_VBskTUzxg)

## GİRİŞ

Linux ve Unix dünyasının dışında, çoğu kullanıcı komut satırında fazla vakit geçirmez. Ancak bir Linux sistem yöneticisi olarak, komut satırı sizin varsayılan çalışma ortamınızdır, bu nedenle bu konuda yetkin olmanız gerekir.

Windows, macOS veya modern Linux sürümlerinde grafik arayüzler kullanırken, genellikle “Resimler”, “Müzik” gibi basit yerler görürsünüz. Ancak teknik bilgiye sahipseniz, tüm bunların altında hiyerarşik bir “dizin yapısı” (örneğin `C:\\Users\\Steve\\Desktop` veya `/home/steve/Desktop`) olduğunu bilirsiniz.

Bu kursta, size bazı iyi çevrimiçi kaynaklar gösterilecek ve ardından birkaç basit görev verilecektir. Diğer kaynakları araştırmakta ve kitaplardan faydalanmakta özgürsünüz. Aslında bu kursun tasarımının temel amacı, **kendi araştırmanızı yapmaya zorlamaktır**. Deneyimli sistem yöneticileri bile komutların nasıl kullanılacağı konusunda çevrimiçi arama yapar, bu yüzden siz de bu alışkanlığı edinmelisiniz.

## BU KISIMDAKİ GÖREVLERİNİZ

* Şimdiye kadar kullanılan komutların belgelerini bulun - [demo](https://asciinema.org/a/619679)  
* Dizinde gezinme, dosya oluşturma, listeleme, taşıma ve silme işlemlerini yapın - [demo](https://asciinema.org/a/619680)  

## RTFM

Linux’un en büyük avantajlarından biri, öğrenmenize yardımcı olmak için tasarlanmış olmasıdır. Çoğu zamanınızı metin kılavuzları, forumlar ve belgelerle geçireceksiniz.

Özel yazılımlar genellikle ücretli destek sunar. Ancak Linux için Canonical, RedHat ve SuSE gibi şirketlerden destek alabilseniz de, buradaki amacınız öğrenmek olduğu için, önce belgeleri okuyarak başlayacağız. Bu da bizi ünlü [RTFM](https://en.wikipedia.org/wiki/RTFM) ifadesine getiriyor: **Önce kılavuzu okuyun!**

Başlangıç olarak, `man` komutunu kullanın. Kurulu her uygulamanın kendi sayfası vardır. Örneğin, `pwd` komutunun sayfasını şu şekilde görebilirsiniz:

```
man pwd
```

Aşağıdaki komutları da deneyin:

```
man cp
man mv
man grep
man ls
man man
```

Ancak bazı komutlar için belgeler fazla detaylı olabilir. Bu yüzden `tldr` harika bir araçtır! Kurmak için şu komutu kullanın:  

```
sudo apt install tldr
```

Örnek kullanım:  

```bash
$ tldr pwd
pwd  
Mevcut çalışma dizinini yazdırır. Daha fazla bilgi: https://www.gnu.org/software/coreutils/pwd.

 - Mevcut dizini yazdır:
   pwd

 - Sembolik bağlantıları çözerek gerçek yolu göster:
   pwd -P
```

Eğer komutun işlevi hakkında bir fikriniz varsa, `apropos` veya `man -k` komutlarını kullanabilirsiniz:  

```bash
$ apropos "working directory"
pwd (1) - mevcut çalışma dizinini yazdırır

$ man -k "working directory"
pwd (1) - mevcut çalışma dizinini yazdırır
```

Bazı komutların `man` sayfası yoktur çünkü bunlar [gömülü komutlardır](https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html). Bu durumda `help` komutunu kullanın:

```bash
$ man export
No manual entry for export

$ help export
export: export [-fn] [name[=value] ...] or export -p
    Set export attribute for shell variables.

    Marks each NAME for automatic export to the environment of subsequently
    executed commands.  If VALUE is supplied, assign VALUE before exporting.

    Options:
      -f        refer to shell functions
      -n        remove the export property from each NAME
      -p        display a list of all exported variables and functions

    An argument of `--' disables further option processing.

    Exit Status:
    Returns success unless an invalid option is given or NAME is invalid. 
```

Bir komutun gömülü olup olmadığını anlamak için `type` komutunu kullanabilirsiniz:

```bash
$ type export
export is a shell builtin
```

Son olarak, `info` komutu da belgeleri okumanız için kullanılabilir.

## DOSYA YAPISINDA GEZİNME

## DOSYA YAPISINDA GEZİNME

* **Kılavuzu okuyarak başlayın:** `man hier`  
* `/`, klasörlerin (dizinlerin) dallandığı bir ağacın "kök" dizinidir.  
* Her zaman sistemin bir parçasında "bulunursunuz" - `pwd` ("print working directory") komutunu yazarak nerede olduğunuzu görebilirsiniz.  
* Genellikle komut istemciniz, bulunduğunuz yeri gösterecek şekilde yapılandırılmıştır. Örneğin, _/etc_ dizininde iseniz, istemciniz `steve@202.203.203.22:/etc$` veya sadece `/etc: $` gibi bir formatta olabilir.  
* **`cd` komutu** ile farklı alanlara geçebilirsiniz - örneğin `cd /var/log` komutu sizi `/var/log` klasörüne götürür. Bunu yaptıktan sonra `pwd` ile kontrol edin ve istemcinizin bulunduğunuz yeri gösterecek şekilde değişip değişmediğine bakın.  
* Yapının "yukarısına" gitmek için `cd ..` ( "cee dee nokta nokta") komutunu kullanabilirsiniz. Bunu denemek için önce `cd /var/log/` yapın, ardından `cd ..` ve bir kez daha `cd ..` yazın. İstemcinizi dikkatle izleyin veya her adımda `pwd` yazarak mevcut dizininizi netleştirin.  
* **Göreli (relative) konumlar** mevcut çalışma dizininize bağlıdır - örneğin, önce `cd /var` yaparsanız, `pwd` komutu ile `/var` içinde olduğunuzu doğrulayabilirsiniz. Buradan `/var/log` dizinine iki yolla geçebilirsiniz: ya tam yolu vererek `cd /var/log` yazarak ya da göreli yolu kullanarak `cd log` komutunu yazarak.  
* Basit bir `cd` komutu her zaman sizi tanımlı "ana dizininize" götürür, buna `~` (tilde karakteri) de denir. [Not: Bu, DOS/Windows’tan farklıdır.]  
* **Bir klasörde hangi dosyalar var?** `ls` (list) komutu, dosya ve alt klasörlerin listesini gösterir. Birçok Linux komutunda olduğu gibi, `ls` komutu da komutun anlamını veya çıktı formatını değiştiren seçenekler (switch) içerir. Önce basit bir `ls` deneyin, ardından `ls -l -t` ve sonra da `ls -l -t -r -a` komutlarını çalıştırın.  
* Geleneksel olarak, `.` ile başlayan dosyalar gizli kabul edilir ve `ls` gibi birçok komut bunları görmezden gelir. `-a` seçeneği (switch) bunları dahil eder. Ana dizininizde (home directory) birkaç gizli dosya görmelisiniz.  
* **Seçenekler (switches) hakkında bir not:** Genellikle, Linux komutları bir veya daha fazla "parametre" ve "seçenek" kabul eder. Örneğin, `ls -l /var/log` komutunda `-l` "uzun format" anlamına gelen bir seçenektir ve `/var/log` bir parametredir. Çoğu komut çok sayıda seçenek kabul eder ve bunlar birleştirilebilir. Örneğin, artık `ls -ltra` yazabilirsiniz, bu da `ls -l -t -r -a` ile aynıdır.  
* Ana dizininizde `ls -ltra` yazın ve en sol sütunu inceleyin - satırın ilk karakteri "d" olan girdiler, dosya değil, dizin (klasör) anlamına gelir. Bunlar farklı bir renk veya yazı tipiyle de gösterilebilir. Değilse, `--color=auto` seçeneğini eklemek (örneğin `ls -ltra --color=auto`) bu durumu düzeltebilir.

## TEMEL DİZİN YÖNETİMİ

* Yeni bir klasör/dizin oluşturmak için `mkdir` komutunu kullanabilirsiniz. Öncelikle ana dizininize (home directory) gidin, `pwd` komutunu çalıştırarak doğru yerde olup olmadığınızı kontrol edin ve ardından bir dizin oluşturun. Örneğin, "test" adında bir dizin oluşturmak için `mkdir test` yazmanız yeterli. Şimdi `ls` komutunu kullanarak sonucu görebilirsiniz.  
* Daha fazla dizin oluşturabilir, bunları birbirinin içine yerleştirebilir ve ardından `cd` komutuyla arasında gezinebilirsiniz.  
* Bir dizini başka bir dizinin içine taşımak istediğinizde, `mv` komutunu kullanır ve taşımak istediğiniz yolu belirtirsiniz.  
* Bir dizini silmek (kaldırmak) için, eğer dizin boşsa `rmdir` komutunu kullanın. İçinde hala dosyalar veya alt dizinler varsa, `rm -r` komutunu kullanmanız gerekir.  

## TEMEL DOSYA YÖNETİMİ

* `touch` komutuyla yeni, boş dosyalar oluşturabilirsiniz. Bu sayede `ls` komutunu biraz daha keşfetme şansı bulursunuz.  
* Bir dosyayı başka bir dizine taşımak istediğinizde, `mv` komutunu kullanır ve hedef yolu belirtirsiniz.  
* Bir dosyayı silmek (kaldırmak) için `rm` komutunu kullanın.  

## ÖZET

Komut satırında rahatça gezinebilmek önemlidir. Ancak bu beceriyi kurs boyunca tekrar tekrar kullanacağınız için, hemen kavrayamazsanız endişelenmeyin.

## EKSTRA

* `pushd` ve `popd` komutlarını öğrenerek birden fazla dizin arasında kolayca gezinebilirsiniz. `pushd /var/log` komutunu çalıştırdığınızda sizi `/var/log` dizinine taşır ancak bulunduğunuz yeri de kaydeder. Birden fazla dizini sırayla `pushd` ile ekleyebilirsiniz. Deneyin: `pushd /var/log`, `pushd /dev`, `pushd /etc`, `pushd`, `popd`, `popd`. Dikkat edin, argümansız kullanılan `pushd`, son eklenen iki dizin arasında geçiş yapar. Ancak [daha karmaşık gezinme yöntemleri](https://opensource.com/article/19/8/navigating-bash-shell-pushd-popd) de mümkündür. Son olarak, `cd -` komutu da sizi en son ziyaret ettiğiniz dizine taşır.

## KAYNAKLAR

* [help, info ve man komutları arasındaki fark](https://unix.stackexchange.com/questions/19451/difference-between-help-info-and-man-command)  
* [GNU Texinfo](https://www.gnu.org/software/texinfo/)  
* [Linux dosya sistemini keşfetmek](https://www.digitalocean.com/community/tutorials/how-to-use-cd-pwd-and-ls-to-explore-the-file-system-on-a-linux-server)  
* [Linux Dosya Sistemi (video)](https://www.youtube.com/watch?v=2qQTXp4rBEE)  
* [Ubuntu Terminal Komutları (video)](http://www.youtube.com/watch?v=CGBsurVdLGY)  

