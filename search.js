(function () {
  var SEARCH_INDEX = [
    {
      url: 'index.html',
      title: "caccio's Profile",
      heading: 'caccio',
      content: '三重県生まれ。大学生の時に愛知県へ移り、大学卒業後はそのまま愛知の病院で医療事務として就職しました。その後、職場の転勤をきっかけに三重県へ戻り、現在に至ります。三重県在住、35歳。 フットサル 毎週金曜日に練習をしています。 F1 テレビ観戦が中心です。 キャンプ 数年前によく行っていましたが、子供が生まれてからは頻度が減りました。最近は父親と一緒に数ヶ月に一度のペースで楽しんでいます。'
    },
    {
      url: 'futsal.html',
      title: 'フットサル - caccio',
      heading: 'フットサル',
      content: '小学生の頃にサッカースクールでボールを蹴り始め、そこから中学では部活動で大会に出場した経験があります。あの頃は毎週の練習がすべてで、仲間との連携が少しずつ形になるのが楽しかったです。社会人になってからはフットサルチームに所属し、現在は少人数で毎週金曜日に集まって練習しています。今はメンバーが少なく、ほとんど個人練習に近い形になっていますが、パスやシュート、体の使い方を確認する時間として大事にしています。人数がそろえば試合形式の活動もしたいと考えており、次は外部のチームと軽めのゲームを組めるように声をかけているところです。少しずつでも仲間を増やして、コートでの緊張感を取り戻したいと思っています。'
    },
    {
      url: 'camp.html',
      title: 'キャンプ - caccio',
      heading: 'キャンプ',
      content: '社会人になってからアニメの影響でキャンプを始め、最初の頃は一人で道具をそろえて森や川辺を巡りました。ひとりで火を起こして食事を作る時間が、自分のペースで過ごせる大切な時間になっていました。その後は妻と一緒に出かけるようになり、二人でテントを張って薪を割る時間が思い出に残っています。特に夕暮れ時に焚き火を囲んで話したひとときは、今でも鮮明に覚えています。子供が生まれてからは以前よりキャンプに行く機会が少なくなりましたが、最近は父と一緒に数ヶ月に一度のペースで出かけています。次回は青山高原にある標高700〜800mのキャンプ地を予定しており、久しぶりの高地での空気を楽しみにしています。将来的には、子供と一緒にテントを張りながら過ごせるようなキャンプを実現したいと考えています。'
    },
    {
      url: 'f1.html',
      title: 'F1 - caccio',
      heading: 'F1',
      content: 'きっかけは、サッカー観戦のためにDAZNを契約したときにF1も見られることを知り、試しに観てみたことです。最初は何となく観始めましたが、スピード感や戦略の読み合いにすぐ引き込まれ、今ではテレビ観戦が中心の趣味になっています。応援しているチームはアストンマーチン・ホンダです。ホンダが好きなことが大きな理由ですが、チームカラーのグリーンとライムの組み合わせも個人的には好みです。応援するたびに、技術とデザインの両方にワクワクします。最も印象に残っているシーズンは、レッドブル・ホンダとして初めてチャンピオンを獲得した年です。あのときのレース展開と歓喜の瞬間は、今でも録画を見返したくなるほど強く心に残っています。好きなドライバーはマックス・フェルスタッペンで、彼の攻めの走りや勝負強さに魅力を感じています。特に雨のレースや最後尾からの追い上げは、応援していて手に汗を握る瞬間です。'
    },
    {
      url: 'making.html',
      title: 'Making - caccio',
      heading: 'Making',
      content: 'プログラミングは全くの未経験でしたが、Claude CodeというAIコーディングツールを使い始めたことがきっかけで、このサイトを自分の手で作ってみることにしました。使っている技術はHTML・CSS・JavaScriptといった基本的なWeb技術で、特別なフレームワークは使っていません。バージョン管理にはGitとGitHubを利用し、公開にはGitHub Pagesという無料のホスティングサービスを使っています。制作はまず環境構築から始め、基本的なページを作って公開し、フィードバックをもらいながら改善を重ね、途中でデザインを雑誌風のスタイルに刷新しました。その後もスクロールアニメーションやダークモード、サイト内検索、PWA対応など機能を一つずつ追加してきました。コードが読めなくても実現したいことを言葉にできれば形にできることを学びました。'
    }
  ];

  var SNIPPET_RADIUS = 28;

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function buildSnippet(text, query) {
    var idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) {
      return text.length > SNIPPET_RADIUS * 2 ? text.slice(0, SNIPPET_RADIUS * 2) + '…' : text;
    }
    var start = Math.max(0, idx - SNIPPET_RADIUS);
    var end = Math.min(text.length, idx + query.length + SNIPPET_RADIUS);
    var snippet = text.slice(start, end);
    if (start > 0) snippet = '…' + snippet;
    if (end < text.length) snippet = snippet + '…';
    return snippet;
  }

  function highlightSnippet(snippet, query) {
    var idx = snippet.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return escapeHtml(snippet);
    var before = snippet.slice(0, idx);
    var match = snippet.slice(idx, idx + query.length);
    var after = snippet.slice(idx + query.length);
    return escapeHtml(before) + '<mark>' + escapeHtml(match) + '</mark>' + escapeHtml(after);
  }

  function search(query) {
    query = query.trim();
    if (!query) return [];
    var lowerQuery = query.toLowerCase();
    var results = [];
    SEARCH_INDEX.forEach(function (page) {
      var inContent = page.content.toLowerCase().indexOf(lowerQuery) !== -1;
      var inHeading = page.heading.toLowerCase().indexOf(lowerQuery) !== -1;
      var inTitle = page.title.toLowerCase().indexOf(lowerQuery) !== -1;
      if (!inContent && !inHeading && !inTitle) return;
      var snippetSource = inContent ? page.content : page.heading;
      var snippet = buildSnippet(snippetSource, inContent ? query : query);
      results.push({
        url: page.url,
        title: page.title,
        snippetHtml: highlightSnippet(snippet, query)
      });
    });
    return results;
  }

  function init() {
    var toggle = document.querySelector('.search-toggle');
    var panel = document.getElementById('search-panel');
    var input = document.querySelector('.search-input');
    var closeBtn = document.querySelector('.search-close');
    var resultsList = document.querySelector('.search-results');
    if (!toggle || !panel || !input || !resultsList) return;

    function renderResults(results, query) {
      resultsList.innerHTML = '';
      if (!query) return;
      if (results.length === 0) {
        var empty = document.createElement('li');
        empty.className = 'search-empty';
        empty.textContent = '一致するページが見つかりませんでした';
        resultsList.appendChild(empty);
        return;
      }
      results.forEach(function (r) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = r.url;
        var titleEl = document.createElement('span');
        titleEl.className = 'search-result-title';
        titleEl.textContent = r.title;
        var snippetEl = document.createElement('span');
        snippetEl.className = 'search-result-snippet';
        snippetEl.innerHTML = r.snippetHtml;
        a.appendChild(titleEl);
        a.appendChild(snippetEl);
        li.appendChild(a);
        resultsList.appendChild(li);
      });
    }

    function openSearch() {
      panel.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      var navToggle = document.querySelector('.nav-toggle');
      var navLinks = document.querySelector('.nav-links');
      if (navToggle && navLinks) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      }
      input.focus();
    }

    function closeSearch() {
      if (panel.hidden) return;
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeSearch();
      } else {
        openSearch();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeSearch);
    }

    input.addEventListener('input', function () {
      renderResults(search(input.value), input.value.trim());
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSearch();
    });

    document.addEventListener('click', function (e) {
      if (panel.hidden) return;
      if (panel.contains(e.target) || toggle.contains(e.target)) return;
      closeSearch();
    });
  }

  init();
})();
