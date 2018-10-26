import 'devbridge-autocomplete';
$(`[data-toggle="autocomplite"]`).each((index, item)=>{
    let $this = $(item);
    $this.autocomplete({
        serviceUrl: $this.data('url'),
        onSelect: (suggestion) => {
            window[$this.data('callback')] && window[$this.data('callback')](suggestion);
        },
    });
});
window.stubFrontCallBack = (suggestion) => {
    alert('Выбранно: ' + suggestion.value);
};
