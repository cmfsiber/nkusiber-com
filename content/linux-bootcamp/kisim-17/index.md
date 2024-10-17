---
title: "Kısım 17 - Kaynaktan Derlemek"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---
# 17. Kısım - Kaynaktan Derlemek

* [Tamamlayıcı Video](https://youtu.be/a9_hry-8Hhw)

## GİRİŞ

Birkaç gün önce, `apt-cache`'e ek depoları yetkilendirmeyi ve bu sayede standart depolarda bulunmayan uygulamaları ya da daha güncel sürümleri nasıl bulabileceğimizi gördük.

Bugün bir adım daha ileri gidiyoruz - doğrudan "kaynağa gidiyoruz". Bu, hafife alınacak bir şey değil – paket yöneticilerinin amacı hayatınızı kolaylaştırmaktır – ancak bazen bu işlem gerekli olabilir ve bu konuda bilgi sahibi olup rahat hissetmelisiniz.

Şimdiye kadar yüklediğimiz uygulamalar, depolardan geliyordu. Buradaki dosyalar "ikili" (binary) dosyalardır - önceden derlenmiş ve genellikle dağıtımınız tarafından özelleştirilmiştir. Ancak, bu uygulamaların çeşitli ve birbiriyle koordinasyonsuz geliştirme projelerinden ("upstream") geldiği ve geliştiricilerin sürekli olarak yeni sürümler üzerinde çalıştığı gerçeği pek açık olmayabilir. Şimdi bu projelerden birine gidip kaynağı indirip derleyerek yükleyeceğiz.

(Paket yöneticilerinin bir diğer önemli işlevi, gerekli olan "bağımlılıkları" tanımlamak ve yüklemektir. Linux dünyasında birçok açık kaynak uygulaması mevcut altyapıyı bu şekilde kullanır, ancak bunu elle çözmek oldukça zor olabilir. Ancak, bugün kaynaktan yükleyeceğimiz uygulama, bağımsız olması nedeniyle nispeten alışılmadık bir örnek.)

## BUGÜNKÜ GÖREVLERİNİZ

* Bir kaynak kod arşivi indirin
* Kaynağı çıkarın ve derleyin

## ÖNCELİKLE GEREKLİ ARAÇLAR

Projeler, uygulamalarını genellikle C, C++ gibi dillerde yazılmış "kaynak dosyaları" olarak sağlar. Bu tür bir kaynak dosyayı indireceğiz, ancak bunu sunucumuzda çalıştırılabilir bir "yürütülebilir" programa dönüştürmek için derlememiz gerekecek. Bunun için yaygın derleyicileri içeren standart bir araç setine ihtiyacımız var. Ubuntu’da bu araç paketi “build-essential” olarak adlandırılır. Aşağıdaki komutla kurabilirsiniz:

`sudo apt install build-essential`

## KAYNAĞI İNDİRME

Önce, sisteminizde `nmap` yüklü olup olmadığını kontrol edin ve `nmap -V` komutunu çalıştırarak sürümünü görün. Bu, standart depodan yüklenen sürümdür. Sonra, `which nmap` komutunu kullanarak çalıştırılabilir dosyanın nerede olduğunu bulun.

Şimdi _http://nmap.org/_ adresine gidip en güncel sürümü indirin. “Source Code Distribution” (Kaynak Kod Dağıtımı) bölümündeki "En son geliştirme nmap sürümü tarball" bağlantısını bulun ve URL’sini not edin. Örneğin:

`https://nmap.org/dist/nmap-7.70.tar.bz2`

Bu, bu notlar yazıldığında mevcut olan 7.70 sürümüdür, ancak şimdiki sürüm farklı olabilir. Şimdi bu dosyayı sunucunuza indireceğiz. Öncelikle dosyayı nereye koyacağımıza karar vermeliyiz – ana dizininize koyacağız. Ana dizine geçmek için:

`cd`

ve ardından `wget` komutunu kullanarak dosyayı indirin:

`wget -v https://nmap.org/dist/nmap-7.70.tar.bz2`

Komuttaki `-v` (verbose), işlemi takip edebilmenizi sağlar. İndirme tamamlandığında, dizin içeriğinizi listeleyin:

`ls -ltr`

Dosya adı uzantısına bakarak dosya formatını anlayabilirsiniz. Bu durumda ".bz2", dosyanın bz2 algoritmasıyla sıkıştırılmış bir arşiv olduğunu gösterir. Bu dosyayı çıkarmak için tek bir komut kullanabiliriz:

`tar -jxvf nmap-7.70.tar.bz2`

Bu komutun anlamı: `-j` bz2 sıkıştırmasını açar, `-x` arşivi çıkarır, `-v` işlem ayrıntılarını gösterir ve `-f` dosya adını belirtir. Şimdi sonucu kontrol edin:

`ls -ltr`

Çıktıda bir dizin oluştuğunu göreceksiniz:

```
-rw-r--r-- 1 steve steve 21633731 2011-10-01 06:46 nmap-7.70.tar.bz2
drwxr-xr-x 20 steve steve 4096 2011-10-01 06:06 nmap-7.70
```

Bu dizine geçin ve içeriğini keşfedin:

`cd nmap-7.70`

Kaynak kodu okuyabilirsiniz. Programlama bilmeseniz bile yorum satırları ilginç olabilir.

## DERLEME VE KURULUM

Genellikle kaynak dosyaların kök dizininde README veya INSTALLATION gibi dosyalar bulunur. Bu dosyaları `more` veya `less` komutlarıyla okuyun. INSTALL dosyasında muhtemelen şöyle bir talimat bulacaksınız:

```
./configure
make
make install
```

Bu adımlar şunları yapar:

- **`./configure`**: Sunucunuzu kontrol eder (örneğin, işlemci türü ve derleyici bilgileri) ve derlemeyi yapılandırır.
- **`make`**: Yazılımı derler.
- **`sudo make install`**: Derlenmiş dosyaları sisteminize yükler.

Kurulum tamamlandıktan sonra, eski ve yeni `nmap` sürümlerini bulmak için:

```
sudo updatedb
locate bin/nmap
```

Her iki sürümü çalıştırarak kontrol edin:

```
/usr/bin/nmap -V
/usr/local/bin/nmap -V
```

Kaynağından yüklediğiniz sürüm artık `apt` tarafından güncellenmeyecektir, bu yüzden güvenlik güncellemelerini manuel olarak takip etmeniz gerekir.

---

Eğer başarılı olduysanız, kendinizi tebrik edin ve ilerlemenizi forumda paylaşın!

## EKSTRA

Kaynak koddan derlemenin yaygın olduğu dağıtımları araştırın:

- [Linux From Scratch](http://www.linuxfromscratch.org/lfs/)
- [Gentoo](http://www.gentoo.org/main/en/about.xml)
- [Arch Build System](https://wiki.archlinux.org/index.php/Arch_Build_System)

## KAYNAKLAR

- [The magic behind configure, make, make install](https://thoughtbot.com/blog/the-magic-behind-configure-make-make-install)
- [Installing From Tarballs](https://dev.to/arbitrary/how-to-install-tarball-tar-files-in-linux-33aa)
- [How to rebuild an existing package from source](http://raphaelhertzog.com/2010/12/15/howto-to-rebuild-debian-packages/)
- [Compiling things on Ubuntu the Easy Way](https://help.ubuntu.com/community/CompilingEasyHowTo)

---
