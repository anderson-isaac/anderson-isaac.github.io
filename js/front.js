/*
* Recebe um objeto e retorna a altura do maior elemento dentro dele.
*/
function getMaior(object) {
	var warray = [];
	$(object).each(function() {
		warray.push($(this).height());
	});
	var maior = Math.max.apply(null, warray);
	return maior;
}


/*
* CEP
*/
function faleConosco() {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("form .m-rua").val("");
        $("form .m-bairro").val("");
        $("form .m-cidade").val("");
        $("form .m-uf").val("");
    }

    //Quando o campo cep perde o foco.
    $("form .m-cep").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("form .m-rua").val("...")
                $("form .m-uf").val("...")
                $("form .m-bairro").val("...")
                $("form .m-cidade").val("...")

                //Consulta o webservice viacep.com.br/
                $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("form .m-rua").val(dados.logradouro);
                        $("form .m-uf").val(dados.uf);
                        $("form .m-bairro").val(dados.bairro);
                        $("form .m-cidade").val(dados.localidade);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }

	});
}


$(document).ready(function() {
/*
* Evento Scrollspy
*/
$('body').scrollspy({target: 'body', offset: 140});
$("a.scrollspy").on('click', function(event) {
if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash + 50;
    console.log($(hash).offset().top);
    $('body').animate({
        scrollTop: $(hash).offset().top
        }, 1000, function(){
    });
}
});


/*
* Botão Voltar
*/
$('.btn-voltar').click(function(e) {
    e.preventDefault();
    var len = history.length;
    var index_url = "<?php echo $Config['UrlSite']; ?>index";
    if (len > 1) {
        console.log(len);
        history.back();
    } else {
        console.log(index_url);
        location.href = index_url;
    }
});


/*
* Scroll to Top
*/
$('#go-top').click(function() {
    $('html, body').animate({
        scrollTop : 0
    }, 800);
});

$('button.modal-form').click(function() {
    var modal_id = $(this).data('form');
    $('#modal-form-content').addClass('active');
    $(modal_id).addClass('active');
});

$('#modal-form-content .cancel-btn, #modal-form-content .close-btn').click(function() {
    $('#modal-form-content').removeClass('active');
    $('#modal-form-content > div').removeClass('active');
});

$(document).mouseup(function(e) {
    var modal_form_on = $('#modal-form-content > div');
    if (!modal_form_on.is(e.target) && modal_form_on.has(e.target).length === 0)  {
        modal_form_on.removeClass('active');
        $('#modal-form-content').removeClass('active');
    }
});

})
