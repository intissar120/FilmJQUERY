$(document).ready(function() {
    $('#search-button').on('click', function() {
        let query = $('#search-input').val().trim();
        if (query) {
            searchSeries(query);
        }
    });

    $('#search-input').on('keypress', function(e) {
        if (e.which === 13) {
            $('#search-button').click();
        }
    });

    function searchSeries(query) {
        $.ajax({
            url: `https://api.tvmaze.com/search/shows?q=${query}`,
            method: 'GET',
            success: function(data) {
                displayResults(data);
            },
            error: function() {
                $('#results').html('<div class="col-12 text-center text-danger">Erreur lors de la recherche. Veuillez réessayer.</div>');
            }
        });
    }

    function displayResults(shows) {
        $('#results').empty();

        if (shows.length === 0) {
            $('#results').html('<div class="col-12 text-center">Aucune série trouvée.</div>');
            return;
        }

        shows.forEach(showData => {
            let show = showData.show;
            let image = show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=Pas+de+photo';
            let summary = show.summary ? show.summary : 'Pas de description disponible.';

            let seriesCard = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${image}" class="card-img-top series-img" alt="${show.name}">
                        <div class="card-body">
                            <h5 class="card-title">${show.name}</h5>
                            <p class="card-text">${summary}</p>
                            <a href="${show.officialSite ? show.officialSite : show.url}" target="_blank" class="btn btn-primary">Plus d'infos</a>
                        </div>
                    </div>
                </div>
            `;

            $('#results').append(seriesCard);
        });
    }
});
