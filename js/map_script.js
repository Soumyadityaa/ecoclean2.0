function camera() {
    window.location.href = "cam.html";
}

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: 23.5, lng: 87.31 }, // Default center
    });
}

// Function to search for facilities and add markers based on the location input
function searchFacilities() {
    const locationInput = document.getElementById('search').value.toLowerCase();
    const trashType = document.getElementById('type').value.toLowerCase();

    const icons = {
        plastic: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        paper: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        decomposable: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        nondecomposable: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        ewaste: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    };

    const locations = [
        {
            name: "durgapur",
            center: { lat: 23.5430311, lng: 87.3399002 },
            trashcans: {
                plastic: [
                    { lat: 23.5418308, lng: 87.3459739 },
                    { lat: 23.5391781, lng: 87.2918809 }
                ],
                paper: [
                    { lat: 23.5430938, lng: 87.3491865 },
                    { lat: 23.5248555, lng: 87.3038679 }
                ],
                decomposable: [
                    { lat: 23.5496538, lng: 87.2346509 },
                    { lat: 23.5882457, lng: 87.2730993 }
                ],
                nondecomposable: [
                    { lat: 23.5558108, lng: 87.2927565 },
                    { lat: 23.5645511, lng: 87.3095849 }
                ],
                ewaste: [
                    { lat: 23.5438609, lng: 87.3415674 },
                    { lat: 23.5357649, lng: 87.3219324 }
                ]
            }
        },
        {
            name: "burdwan",
            center: { lat: 23.2324, lng: 87.8615 },
            trashcans: {
                plastic: [
                    { lat: 23.2372453, lng: 87.8819128 },
                    { lat: 23.2413566, lng: 87.8501687 }
                ],
                paper: [
                    { lat: 23.2425845, lng: 87.8361924 },
                    { lat: 23.2324763, lng: 87.8622112 }
                ],
                decomposable: [
                    { lat: 23.2143555, lng: 87.8902982 },
                    { lat: 23.2326776, lng: 87.8944444 }
                ],
                nondecomposable: [
                    { lat: 23.2326876, lng: 87.8622367 },
                    { lat: 23.2326234, lng: 87.8680090 }
                ],
                ewaste: [
                    { lat: 23.2842245, lng: 87.88268 },
                    { lat: 23.2425476, lng: 87.8599067 }
                ]
            }
        },
        {
            name: "asansol",
            center: { lat: 23.6889, lng: 86.9661 },
            trashcans: {
                plastic: [
                    { lat: 23.6834947, lng: 86.9863938 },
                    { lat: 23.6804947, lng: 86.9873938}
                ],
                paper: [
                    { lat: 23.6813288, lng: 86.958769 },
                    { lat: 23.6834947, lng: 86.9863938}
                ],
                decomposable: [
                    { lat: 23.6823167, lng: 86.9117234 },
                    { lat: 23.6834947, lng: 86.9863938}
                ],
                nondecomposable: [
                    { lat: 23.7140108, lng: 86.9738543 },
                    { lat: 23.6834947, lng: 86.9863938}
                ],
                ewaste: [
                    { lat: 23.6889110, lng: 86.96707978 },
                    { lat: 23.6834947, lng: 86.9863938}
                ]
            }
        },
        {
            name: "kolkata",
            center: { lat: 22.5744, lng: 88.3629 },
            trashcans: {
                plastic: [
                    { lat: 22.5185808, lng: 88.2410169 },
                    { lat: 22.5753314, lng: 88.400987 }
                ],
                paper: [
                    { lat: 22.5217522, lng: 88.2101178 },
                    { lat: 22.4621172, lng: 88.3076215 }
                ],
                decomposable: [
                    { lat: 22.4621172, lng: 88.3076215 },
                    { lat: 22.5382429, lng: 88.2245371 }
                ],
                nondecomposable: [
                    { lat: 22.5185808, lng: 88.2410169 },
                    { lat: 22.5217522, lng: 88.2101178 }
                ],
                ewaste: [
                    { lat: 22.5185808, lng: 88.2410169 },
                    { lat: 22.6548861, lng: 88.3309671 }
                ]
            }
        },
        {
            name: "bolpur",
            center: { lat: 23.6712, lng: 87.6919 },
            trashcans: {
                plastic: [
                    { lat: 23.671195, lng: 87.6218543 },
                    { lat: 23.691195, lng: 87.6918543 }
                ],
                paper: [
                    { lat: 23.671195, lng: 87.6218543 },
                    { lat: 23.6581471, lng: 87.6613877 }
                ],
                decomposable: [
                    { lat: 23.6507899, lng: 87.6980399 },
                    { lat: 23.6581471, lng: 87.6613877 }
                ],
                nondecomposable: [
                    { lat: 23.6786889, lng: 87.6826561 },
                    { lat: 23.6660867, lng: 87.6458447 }
                ],
                ewaste: [
                    { lat: 23.6810218, lng: 87.6395743 },
                    { lat: 23.6717647, lng: 87.6657021 }
                ]
            }
        }
    ];

    // Find the selected location
    const selectedLocation = locations.find(loc => loc.name === locationInput);

    if (selectedLocation) {
        map.setCenter(selectedLocation.center);
        map.setZoom(12);

        const selectedTrashcans = selectedLocation.trashcans[trashType];

        if (selectedTrashcans) {
            // Remove previous markers
            clearMarkers();

            // Add new markers for the selected trash type
            selectedTrashcans.forEach(position => {
                const marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    icon: icons[trashType]
                });
                markers.push(marker);
            });
        } else {
            alert(`No trashcans found for the type: ${trashType}`);
        }
    } else {
        alert("Please enter a valid location: durgapur, burdwan, asansol, kolkata, or bolpur.");
    }
}

// Clear all existing markers from the map
let markers = [];

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

// Load the Google Maps API script asynchronously
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBMP7J2D9PUrjYfaqd9H_BE5rZSkS2r7_g&libraries=places&callback=initMap`;
script.defer = true;
document.head.appendChild(script);

// Event listener for Enter key on the search input field
document.getElementById('search').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action
        document.getElementById('type').focus(); // Shift focus to the type input field
    }
});

// Event listener for Enter key on the type input field
document.getElementById('type').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action
        searchFacilities(); // Call the search function
    }
});
