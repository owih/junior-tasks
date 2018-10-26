(() => {
    const ymaps = global.ymaps;
    const ClassName = {
        BLOCK: 'ymaps',
    };
    let blocks = Array.from(document.getElementsByClassName(ClassName.BLOCK));
    if (blocks.length) {
        ymaps.ready(()=>{
            blocks.forEach((block)=>{
                // Инициализируем карту;
                var map = new ymaps.Map(block, {
                    center: [0, 0],
                    zoom: 10,
                    controls: ['fullscreenControl'],
                });
                // Добавляем точки на карту
                if (block.dataset['placemarks']) {
                    $.ajax(block.dataset['placemarks'], {
                        dataType: 'json',
                        success: (json) => {
                            // Создаем шаблон контента для Placemark
                            var placemarkContentLayout = ymaps.templateLayoutFactory.createClass('<i class="ymaps__placemark"></i>');
                            // Создаем кластер;
                            var clusterer = new ymaps.Clusterer(
                                {
                                    clusterIconColor: '#0A61FF',
                                }
                            );
                            // Формируем список точек;
                            var placemark = json.map((placemark)=> new ymaps.Placemark(
                                placemark.coords,
                                {
                                    balloonContentHeader: placemark.balloonContentHeader,
                                    balloonContentBody: placemark.balloonContentBody,
                                },
                                {
                                    iconLayout: 'default#imageWithContent',
                                    iconImageHref: '',
                                    iconContentLayout: placemarkContentLayout,
                                }
                            ));
                            // Изменение размера карты
                            var sizeChange = () => {
                                if (placemark.length > 1) {
                                    map.setBounds(map.geoObjects.getBounds());
                                } else {
                                    map.setCenter(placemark[0].geometry.getCoordinates(), 12);
                                }
                            };
                            // Добавляем точки в кластер;
                            clusterer.add(placemark);
                            // Добавляем кластер на карту;
                            map.geoObjects.add(clusterer);
                            // Масштабируем карту по изменению размера;
                            map.events.add('sizechange', sizeChange);
                            sizeChange();
                        },
                    });
                }
            });
        });
    }
})();
