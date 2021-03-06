$(document).on('ready', function() {

    console.log(sessionStorage.user);

    let isCreated = false;
    let scoreArr = [];
    let isPosted = false;
    let chosenBar;
    let chosenId;
    let chosenQuestion;
    let isQchosen = false;
    let chosenBurrow;
    let url = window.location.href;
    let last = url.lastIndexOf('/');
    let thisUser = url.substr(last + 1);
    let user;
    let burrow1, burrow2, burrow3, burrow4, burrow5;

    $('#q0, #q0B').css('transition', 'all 1.5s ease');
    //
    setTimeout(() => {

        $('.questions, .questionsB, #user').css({'opacity': '1'});
        setTimeout(() => {
            allGlow();
        }, 350);
    }, 2000);

    $.get('/getuser/' + thisUser, (data) => {
        console.log(data);
        user = data;
        $.get('/getuser/' + user.burrow1, (bur1) => {
            console.log(bur1);
            burrow1 = bur1;
        });
        $.get('/getuser/' + user.burrow2, (bur2) => {
            console.log(bur2);
            burrow2 = bur2;
        });
        $.get('/getuser/' + user.burrow3, (bur3) => {
            console.log(bur3);
            burrow3 = bur3;
        });
        $.get('/getuser/' + user.burrow4, (bur4) => {
            console.log(bur4);
            burrow4 = bur4;
        });
        $.get('/getuser/' + user.burrow5, (bur5) => {
            console.log(bur5);
            burrow5 = bur5;
        });

        $('#bg-vid').attr('src', user.link);
        $("#bg-vid")[0].load();
        // if (thisUser === 'zy' || thisUser === 'dev' || thisUser === 'ona' || thisUser === 'nid') {
            $('#bg-vid').css({'filter': 'brightness(0.6)'});
        // }
        $('#bg-vid').css('opacity', '1');
        if (thisUser === 'luc' || thisUser === 'fin') {
            $('#bg-vid').css('opacity', '.5');
        }

    });

    setTimeout(() => {
        $('#return').css('opacity', '1');
    }, 2500);

    $('#return').on('click', () => {
        $('*').css({'transition': 'all 3s ease', 'opacity': '0'});
        $('body').css({'opacity': '1', 'background-color': 'rgba(40, 40, 40, 1)'});
        setTimeout(() => {
            $.get('/home', () => {});
            window.location.href = "/home";
        }, 3000);
    })

//pops out profile from left
    let popOutLeft = (id, direction) => {
        $('#'+id).css({
            'width': '250px',
            'border': '1px solid white',
            'opacity': '.5',
            'border-top-right-radius': '10%',
            'border-bottom-right-radius': '10%'
        });
        $('#'+id).css('background-color', 'rgba(255,255,255, 0)');
        $('#'+id).children().css('margin-'+direction, '0px');
    }
//pops out match from right
    let popOutRight = (id, direction) => {
        $('#'+id).css({
            'width': '250px',
            'border': '1px solid white',
            'opacity': '.5',
            'border-top-left-radius': '10%',
            'border-bottom-left-radius': '10%'
        });
        $('#'+id).css('background-color', 'rgba(255,255,255, 0)');
        $('#'+id).children().css('margin-'+direction, '0px');
    }
//pops back in
    let popIn = (id, direction, radiusTop, radiusBottom) => {
        $('#'+id).css({
            'width': '5px',
            'border': 'none',
            'opacity': '1',
            radiusTop: '0%',
            radiusBottom: '0%'
        });
        $('#'+id).css('background-color', 'rgba(255,255,255, 1)');
        // $('#'+id).children().css('margin-'+direction, '-250px');
    }
//fades in a glow over the bar filters
    let waitGlowFunc = (num, time, px, str) => {
      let waitGlow3 = setTimeout(function() {
        $('#q'+num).css({'transition': 'box-shadow 1s ease', 'box-shadow': '0px 0px '+px+'px '+str+'px white'});
      }, time);
    }
//fades in and out over all the bar filters in a wave pattern
    let allGlow = () => {
      //left side
      waitGlowFunc('0', 000, 200, 20);
      waitGlowFunc('2', 100, 175, 1);
      waitGlowFunc('3', 200, 175, 1);
      waitGlowFunc('4', 300, 125, 1);
      waitGlowFunc('5', 400, 200, 1);
      waitGlowFunc('2', 500, 0, 0);
      waitGlowFunc('3', 600, 0, 0);
      waitGlowFunc('4', 700, 0, 0);
      waitGlowFunc('5', 800, 0, 0);
      waitGlowFunc('0', 800, 0, 0);
      //right side
      waitGlowFunc('0B', 000, 200, 20);
      waitGlowFunc('2B', 100, 175, 1);
      waitGlowFunc('3B', 200, 175, 1);
      waitGlowFunc('4B', 300, 125, 1);
      waitGlowFunc('5B', 400, 200, 1);
      waitGlowFunc('2B', 500, 0, 0);
      waitGlowFunc('3B', 600, 0, 0);
      waitGlowFunc('4B', 700, 0, 0);
      waitGlowFunc('5B', 800, 0, 0);
      waitGlowFunc('0B', 800, 0, 0);
    }

    $('#q1').on('click', function() {
            popIn('q1', 'left', 'border-top-left-radius', 'border-bottom-left-radius');
    });

    $('#q1B').on('click', function() {
            popIn('q1B', 'right', 'border-top-right-radius', 'border-bottom-right-radius');
    });

    $('#post, #photo').css('margin-bottom', '443px');
    $("#wrapper").css('opacity', '0');
    $("#wrapper").toggleClass("toggled");
    let wait = setTimeout(function() {
        $("#wrapper").css('opacity', '1');
    }, 1000);

    $('#q1-contain').mouseenter(() => {
        popOutLeft('q1', 'right');
    });
    $('#q1-contain').mouseleave(() => {
        popIn('q1', 'left', 'border-top-left-radius', 'border-bottom-left-radius');
    });
    $('#q1-containB').mouseenter(() => {
        popOutRight('q1B', 'left');
    });
    $('#q1-containB').mouseleave(() => {
        popIn('q1B', 'right', 'border-top-right-radius', 'border-bottom-right-radius');
    });

    $('.all-box-left, .all-box-right').css('cursor', 'default');
    let isToggled = false;
    let id = 'q';
    let leftOrRight = 'left';
//controls all toggle click functionality of the filter bars
    let type = (qId, curId, question, info) => {
        let lastChar = qId.substr(qId.length - 1);
        let chooseToggle = () => {
          if (lastChar === 'x') {
            if (leftOrRight !== 'left') {
              $('#sidebar-wrapper').toggleClass('right-slide');
            }
            $("#wrapper").toggleClass("toggled");
            leftOrRight = 'left';
          } else if (lastChar === 'B') {
            if (leftOrRight !== 'right') {
              $('#sidebar-wrapper').toggleClass('right-slide');
            }
            $("#wrapper").toggleClass("toggled");
            leftOrRight = 'right';
          }
        }
        if (!isToggled) {
            $('#match1').text(question);
            $('#button-holder').html(info);
            chooseToggle();
            isToggled = true;
            isQchosen = false;
            id = qId;
        } else {
            if (id === curId) {
                chooseToggle();
                isToggled = false;
                isQchosen = false;
            } else {
                $('#match1').html(question);
                $('#button-holder').html(info);
                isQchosen = true;
                isToggled = true;
                id = qId;
            }
        }
    }
//function to dictate all hover actions
    let hoverState = (id, question, info, height, width) => {
      $('#'+id).css({'transition': 'all .3s ease', 'width': width+'px', 'color': 'white' });
      if (!isQchosen) {
        $('.sidebar-nav').css('margin-top', height+'px');
      }
      if (isToggled && !isQchosen) {
          $('#match1').html(question);
          $('#button-holder').html(info);
      }
    }

    $('#enter').on('click', function() {
        let text = $('#match1').html();
        let last = text.lastIndexOf(' ');
        let burrowUser = text.substr(last + 1);
        setTimeout(() => {
            $('.questions, .questionsB, #user').css({'transition': 'all 2s ease', 'opacity': '0'});
        }, 1000);
        setTimeout(() => {
            $('#bg-vid').css({'transition': 'all 2s ease', 'opacity': '0'});
        }, 2000);
        setTimeout(() => {
            $.get('/portalentrance/' + burrowUser, (data) => {
                console.log(data);
            });
            window.location.href = "/portalentrance/" + burrowUser;
        }, 3500);
    });

    $("#q2-hover-box").on('mouseenter', function() {
      hoverState('q2', 'Burrow into: ' + user.burrow1, burrow1.info, '40', '13');
    });
    $("#q3-hover-box").on('mouseenter', function() {
      hoverState('q3', 'Burrow into: ' + user.burrow2, burrow2.info, '90', '12');
    });
    $("#q4-hover-box").on('mouseenter', function() {
      hoverState('q4', 'Burrow into: ' + user.burrow3, burrow3.info, '140', '11');
    });
    $("#q5-hover-box").on('mouseenter', function() {
      hoverState('q5', 'Burrow into: ' + user.burrow4, burrow4.info, '190', '10');
    });

    $("#q2-hover-boxB").on('mouseenter', function() {
      hoverState('q2B', 'Burrow into: ' + user.burrow1, burrow1.info, '40', '13');
    });
    $("#q3-hover-boxB").on('mouseenter', function() {
      hoverState('q3B', 'Burrow into: ' + user.burrow2, burrow2.info, '90', '12');
    });
    $("#q4-hover-boxB").on('mouseenter', function() {
      hoverState('q4B', 'Burrow into: ' + user.burrow3, burrow3.info, '140', '11');
    });
    $("#q5-hover-boxB").on('mouseenter', function() {
      hoverState('q5B', 'Burrow into: ' + user.burrow4, burrow4.info, '190', '10');
    });

    $("#q0-hover-box").on('mouseenter', function() {
        $('#left-light').css({'transition': 'all .1s ease', 'opacity': '1'});
        if (!isQchosen) {
          $('.sidebar-nav').css('margin-top', '-10px');
        }
        if (isToggled && !isQchosen) {
            $('#match1').html('Burrow into: ' + user.burrow5);
            $('#button-holder').html(burrow5.info);
        }
    });
    $("#q0-hover-boxB").on('mouseenter', function() {
        $('#right-light').css({'transition': 'all .1s ease', 'opacity': '1'});
        if (!isQchosen) {
          $('.sidebar-nav').css('margin-top', '-10px');
        }
        if (isToggled && !isQchosen) {
            $('#match1').html('Burrow into: ' + user.burrow5);
            $('#button-holder').html(burrow5.info);
        }
    });

    $("#q0-hover-box").on('mouseleave', function() {
        $('#left-light').css({'transition': 'all .1s ease', 'opacity': '0'});
    });
    $("#q0-hover-boxB").on('mouseleave', function() {
        $('#right-light').css({'transition': 'all .1s ease', 'opacity': '0'});
    });

    $(".all-box-left, .all-box-right").on('mouseleave', function() {

        $('.questions, .questionsB').css({ 'width': '2px', 'opacity': '1' });
    });
//parent function to the type function
    let clickBar = (id, question, info) => {
      $(document).on('click', id, function() {
          chosenBurrow = question;
          chosenBar = $(this);
          chosenId = chosenBar.attr('id');
          chosenQuestion = 'Burrow into: ' + question;
          if (isPosted) {
              type(id, chosenId, chosenQuestion, info);
          }
      });
    }

    setTimeout(() => {
        clickBar('div#q2-hover-box', user.burrow1, burrow1.info);
        clickBar('div#q3-hover-box', user.burrow2, burrow2.info);
        clickBar('div#q4-hover-box', user.burrow3, burrow3.info);
        clickBar('div#q5-hover-box', user.burrow4, burrow4.info);
        clickBar('div#q0-hover-box', user.burrow1, burrow5.info);

        clickBar('div#q2-hover-boxB', user.burrow1, burrow1.info);
        clickBar('div#q3-hover-boxB', user.burrow2, burrow2.info);
        clickBar('div#q4-hover-boxB', user.burrow3, burrow3.info);
        clickBar('div#q5-hover-boxB', user.burrow4, burrow4.info);
        clickBar('div#q0-hover-boxB', user.burrow1, burrow5.info);
    }, 500);


    $('#friend-finder').on('mouseleave', function() {
        $('#button-hover').css('opacity', 0);
    });
    $('#friend-finder').on('mouseenter', function() {
        $('#button-hover').css('opacity', 1);
        $('button').css('cursor', 'pointer');
    });

    $('.all-box-left, .all-box-right').css('cursor', 'pointer');
    isPosted = true;

//functionality for each button/answer chosen
//post sent after 10 questions have been answered
    $('.all-buttons, #enter, #hide').on('click', function(e) {
        e.preventDefault();
        allGlow();
        $('#q1').children().fadeOut('slow');
        isQchosen = false;
        isToggled = false;
        let answer = $(this);
        let ansNumber = answer.attr('data-num');
        scoreArr.push(ansNumber);
        $("#wrapper").toggleClass("toggled");
        let chosenId = $(this).attr('id');
        chosenBar.css('pointer-events', 'none');
        newCharacter.scores = scoreArr;
    });

});
