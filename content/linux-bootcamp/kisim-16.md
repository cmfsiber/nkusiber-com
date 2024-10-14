---
title: "Kısım 16 - Arşivleme ve Sıkıştırma"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---

# 16. Kısım - Arşivleme ve Sıkıştırma

* [Tamamlayıcı video](https://youtu.be/r2Rfg6x-5MQ)

## GİRİŞ

Bir sistem yöneticisi olarak, dosyaların sıkıştırılmış "arşivleri" ile rahatça çalışabilmeniz gerekir. Özellikle, yazılım yükleme ve yedekleme yönetimi gibi önemli görevleriniz için bu yetenek çok önemlidir.

## BUGÜNKÜ GÖREVLERİNİZ

* Bir tarball oluşturun.  
* Sıkıştırılmış bir tarball oluşturun ve boyutlarını karşılaştırın.  
* Bir tarball’dan dosyaları çıkartın.

## ARŞİV OLUŞTURMA

Diğer işletim sistemlerinde, WinZip veya pkzip gibi uygulamalar, dosya ve klasörleri **.zip** uzantılı sıkıştırılmış dosyalara dönüştürmek için uzun zamandır kullanılıyor. Ancak Linux’ta bu süreç biraz farklı işler: Dosyaları toplama işlemi bir adımda, sıkıştırma ise başka bir adımda yapılır.  

Örneğin, **_/etc/init.d_** klasöründeki dosyaların bir "anlık görüntüsünü" şu şekilde oluşturabilirsiniz:

```bash
tar -cvf myinits.tar /etc/init.d/
```

Bu komut, geçerli dizininizde **myinits.tar** adlı dosyayı oluşturur.  

**Not 1:** `-f` parametresi, çıktı dosyasının ismini belirtir. Bu nedenle komut sırası önemlidir: **tar**, `-f`’den sonra gelen her şeyi arşiv dosyasının ismi olarak kabul eder. Bu yüzden `-f` bayrağını her zaman en son kullanmak önemlidir.  

**Not 2:** `-v` (verbose) bayrağı, işlemin ilerleyişini ekrana yazdırır. Geleneksel olarak birçok araç, ancak hata oluştuğunda geri bildirim verir.  

(`tar` ismi "tape archive", yani "bant arşivi" anlamına gelir.)

Oluşturulan bu dosyayı GnuZip ile şu şekilde sıkıştırabilirsiniz:

```bash
gzip myinits.tar
```

Bu komut, **myinits.tar.gz** adlı sıkıştırılmış bir arşiv oluşturur. Sıkıştırılmış tar arşivleri, genellikle **"tarball"** olarak adlandırılır. Bazı arşivlerin **_.tgz_** uzantısına sahip olduğunu da görebilirsiniz. Linux komut satırı için bu farkın bir anlamı yoktur, ancak insanlar için dosyanın türünü ayırt etmeyi kolaylaştırır.

İşlem iki adımda yapılabilir olsa da, bunu tek adımda gerçekleştirmek için "-z" bayrağını kullanabilirsiniz:

```bash
tar -cvzf myinits.tgz /etc/init.d/
```

Bu komut şu anlamlara gelir:  
* **`-c`**: Arşiv oluştur.  
* **`-v`**: İşlem sırasında ayrıntılı çıktı ver.  
* **`-z`**: Arşivi sıkıştır.  
* **`-f`**: Çıktı dosyasının ismini belirt.

## BUGÜNKÜ GÖREVLER

1. **KAYNAKLAR** bölümündeki bağlantıları inceleyin ve bir arşivden dosya çıkarmayı öğrenin.  
2. `tar` komutunu kullanarak bazı dosyaların arşivini oluşturun ve dosya boyutunu kontrol edin.  
3. Aynı komutu bu kez `-z` bayrağı ile sıkıştırma yaparak çalıştırın ve dosya boyutunu karşılaştırın.  
4. Oluşturduğunuz arşivleri **/tmp** dizinine kopyalayın (`cp` komutuyla) ve arşivleri burada açarak çalışıp çalışmadığını test edin.

## İLERLEMENİZİ PAYLAŞMA

Bugün için paylaşılacak bir şey yok, ancak bu konuyu anladığınızdan emin olun. Bir sonraki oturumda bunu gerçek hayatta kullanacağız!

## EK BİLGİLER

1. **.bz2** dosyası nedir ve içeriğindeki dosyalar nasıl çıkartılır?  
2. `tar` komutunda mutlak ve göreli yolların nasıl işlendiğini araştırın. Kök kullanıcı olarak arşiv çıkartırken neden dikkatli olmanız gerektiğini öğrenin.  
3. Bazı rehberlerde `tar cvf` yerine `tar -cvf` yazıldığını görebilirsiniz. Nedenini biliyor musunuz?

## KAYNAKLAR

* [Linux'ta 18 Tar Komut Örneği](https://www.tecmint.com/18-tar-command-examples-in-linux/)  
* [Linux TAR Komutu](http://linuxbasiccommands.wordpress.com/2008/04/04/linux-tar-command/)  
* [Linux tar Komutu Eğitimi](https://www.youtube.com/watch?v=CUdwDEKlDrw) (video)  

Bazı haklar saklıdır. Lisans koşullarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) inceleyin.

---

