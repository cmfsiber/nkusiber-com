---
title: "Kısım 05 - More veya Less..."
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---
# 5. Kısım - More veya Less...

* [Ders videosu](https://youtu.be/SdvrCmhsm2M)

## GİRİŞ

Bugünü hızlıca beş farklı konunun kısa bir tanıtımıyla tamamlayacağız. Bugün bu konularda ustalaşmanız gerekmiyor – bunların hepsiyle sonraki oturumlarda bol bol pratik yapacaksınız!

Bu komutların basit göründüğüne aldanmayın – hepsi aslında derin bir yapıya sahip ve birçok sistem yöneticisi bu komutların birkaçını her gün kullanır.

## BUGÜNKÜ GÖREVLERİNİZ

* Sekme tamamlama (tab completion) kullanın  
* Komut geçmişinde arama yapın  
* Bir nokta dosyasını `more` ve `less` ile okuyun  
* Komut isteminizi değiştirin / özelleştirin  

Bu görevleri tamamlamak için Kaynaklar bölümündeki bağlantıları kullanın:

* Dosya görüntülemek için `more` ve `less` komutlarını kullanmaya alışın. `less` içinde bir dosyanın en üstüne veya altına gitmeyi öğrenin ve bir metni aramayı deneyin.

* “Sekme tamamlama”yı test edin – bu, komutları doğru girmenize yardımcı olan kullanışlı bir özelliktir. Hem komutu hem de dosya adı parametrelerini bulmanıza yardımcı olur; örneğin, `les` yazdıktan sonra “Tab” tuşuna basmak `less` komutunu tamamlar. Aynı şekilde, `less /etc/serv` yazıp “Tab” tuşuna basmak, komutu `less /etc/services` olarak tamamlayacaktır. `less /etc/s` yazıp tekrar “Tab” tuşuna basarak bu özelliğin belirsiz durumları nasıl ele aldığını gözlemleyin.

* Artık birçok komut yazdığınıza göre, yukarı ok tuşuna basarak komut geçmişinde gezinin. Sadece en son yazdığınız komutları değil, önceki oturumlarınızdan kalan komutları da görebileceksiniz. Şimdi `history` komutunu deneyin – bu komut, önbelleğe alınmış tüm komut geçmişinizi (genellikle 100’den fazla giriş) listeler. Burada birkaç akıllı işlem yapabilirsiniz. En basiti, bir komutu tekrarlamaktır: Bir satır seçin (örneğin, 20. satır) ve `!20` yazıp “Enter” tuşuna basarak o komutu tekrar çalıştırın. Uzun ve karmaşık komutlar yazarken bu *çok* kullanışlıdır. Ayrıca, `Ctrl + r` tuşlarına basıp aradığınız komutun herhangi bir bölümünü yazmayı deneyin. Komut isteminde geçmişten bir komutun otomatik tamamlandığını göreceksiniz. Daha fazla yazdıkça daha spesifik seçenekler görünecektir. Komutu doğrudan çalıştırmak için “Enter” tuşuna basabilir veya düzenlemek için ok tuşlarını kullanabilirsiniz. `Ctrl + r`'ye basmaya devam ederek aynı komutun farklı varyasyonlarını da görebilirsiniz.

* Ev dizininizdeki “gizli” dosyaları arayın. Linux'ta, “.” karakteriyle başlayan dosyalar gizli sayılır. Bu nedenle, `cd` yazarak ev dizininize dönün ve `ls -l` yazarak hangi dosyaların olduğunu gösterin. Ardından, `ls -la` veya `ls -ltra` (buradaki "a", "all" yani "tüm" anlamına gelir) komutlarını kullanarak gizli dosyaları da listeleyin. “Dot files” (nokta dosyaları) en çok ev dizinindeki kişisel ayarları saklamak için kullanılır. Şimdi `.bashrc`, `.bash_history` ve diğer dosyaların içeriğini incelemek için `less` komutuyla yeni becerilerinizi kullanın.

* Son olarak, ev dizininizde bir dosya oluşturmak için `nano` editörünü kullanın ve son beş günün nasıl geçtiğine dair bir özet yazın.

## EK GÖREV

Şu anda terminal kabuğu olarak `bash` kullanıyoruz (birçok dağıtımda varsayılan olarak gelir), ancak tek seçenek bu değildir. [zsh](https://www.geeksforgeeks.org/how-to-install-z-shellzsh-on-linux/), [fish](https://fishshell.com/) veya [oh-my-zsh](https://ohmyz.sh/) gibi alternatifleri deneyin. Aralarındaki farkları ve özelliklerin kullanımını inceleyin.

Sonra, bir adım ileri gidip aynı terminal penceresinde birkaç kabuk oturumunu aynı anda açık tutmayı deneyin. Bunun için bir **terminal çoklayıcı** kullanabilirsiniz. [screen](https://linuxize.com/post/how-to-use-linux-screen/) daha basit ve başlangıçta biraz sade olabilir – veya birçok özellikle birlikte gelen [tmux](https://github.com/tmux/tmux/wiki) kullanabilirsiniz. “tmux’u nasıl özelleştiririm” konusunda birçok materyal bulabilirsiniz. Keyifli keşifler!

## KAYNAKLAR

* [Unix Less Komutu: Etkili Gezinme İçin 10 İpucu](http://www.thegeekstuff.com/2010/02/unix-less-command-10-tips-for-effective-navigation/)  
* [Bash Geçmiş Komutları ve Genişletmeleri](https://www.digitalocean.com/community/tutorials/how-to-use-bash-history-commands-and-expansions-on-a-linux-vps)  
* [BASH Shell komutları less](http://www.youtube.com/watch?v=ZQTt0LEoj3k)  
* [Sekme Tamamlama](https://www.youtube.com/watch?v=7V-fovVlCvA)  
* [Dot Files Nedir?](http://thegeekyway.com/what-are-dotfiles/)  
* [Nano Editör Eğitimleri](http://www.debianadmin.com/nano-editor-tutorials.html)  
* [Bash Shell: PS1, PS2, PS3, PS4 ve PROMPT_COMMAND'ı Kontrol Edin](http://www.thegeekstuff.com/2008/09/bash-shell-take-control-of-ps1-ps2-ps3-ps4-and-prompt_command/)  
* [Bash Shell PS1: Linux İstemini Angelina Jolie Gibi Yapmanın 10 Yolu](http://www.thegeekstuff.com/2008/09/bash-shell-ps1-10-examples-to-make-your-linux-prompt-like-angelina-jolie/)

Bazı haklar saklıdır. Lisans şartlarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) kontrol edin.

