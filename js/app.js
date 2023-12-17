const loadData = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayCard(data.data.tools.slice(0, 6));
};

const toolContainer = document.getElementById("tools-container");
const seeMoreButton = document.getElementById("btn-see-more");

const displayCard = (tools) => {
  //   console.log(tools);
  // Clear existing content
  toolContainer.innerHTML = "";

  // card show
  tools.forEach((tool) => {
    // console.log(tool.id);

    const toolDiv = document.createElement("div");
    const features = tool.features;
    toolDiv.innerHTML = `
        <div class="card p-4">
          <img src="${tool.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol>
              ${features.map((feature) => `<li>${feature}</li>`).join("")}
            </ol>
          </div>
          <hr>
          <h5 class="card-title">${tool.name}</h5>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-month" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
              <path d="M16 3v4" />
              <path d="M8 3v4" />
              <path d="M4 11h16" />
              <path d="M7 14h.013" />
              <path d="M10.01 14h.005" />
              <path d="M13.01 14h.005" />
              <path d="M16.015 14h.005" />
              <path d="M13.015 17h.005" />
              <path d="M7.01 17h.005" />
              <path d="M10.01 17h.005" />
            </svg> ${tool.published_in}
          </p>
          <button onclick="loadToolDetails('${
            tool.id
          }')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#toolDetailModal">Show Details</button>

        </div>
      `;
    toolContainer.appendChild(toolDiv);
  });
  // Check if there are more tools
  if (tools.length < 6) {
    seeMoreButton.style.display = "none";
  }
};

seeMoreButton.addEventListener("click", async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayCard(data.data.tools);
  seeMoreButton.style.display = "none";
});

// modal functional
const loadToolDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  //   console.log(data.data);
  displayToolDetails(data.data);
};

const toolDetails = document.getElementById("tool-details");
const displayToolDetails = (tool) => {
  const mfeatures = tool.features;
  const integrations = tool.integrations;
  const modalDiv = document.createElement("div");
  console.log(tool.integrations);
  let featureName = "";
  for (const [key, value] of Object.entries(mfeatures)) {
    // console.log(value.feature_name);
    featureName += `<li>${value.feature_name}</li>`;
  }

  toolDetails.innerHTML = "";

  modalDiv.innerHTML = `
  <div class="container mt-5">
  <div class="row">
      <!-- First Card -->
      <div class="col-md-6 mb-4">
          <div class="card text-white bg-primary mb-3">
              <div class="card-body ">
                  <h5 class="mb-5">${tool.description}</h5>
                  <!-- Pricing -->
                  <div class="row ">
                      <div class="col-4 border border-white rounded p-1">
                          <h6 class="card-subtitle mb-2">${
                            tool.pricing[0].plan
                          }</h6>
                          <p class="card-text">${tool.pricing[0].price}</p>
                      </div>
                      <div class="col-4 border border-white rounded p-1">
                          <h6 class="card-subtitle mb-2">${
                            tool.pricing[1].plan
                          }</h6>
                          <p class="card-text">${tool.pricing[1].price}</p>
                      </div>
                      <div class="col-4 border border-white rounded p-1">
                          <h6 class="card-subtitle mb-2">${
                            tool.pricing[2].plan
                          }</h6>
                          <p class="card-text">${tool.pricing[2].price}</p>
                      </div>
                  </div>
                  <!-- Features -->
                  <div class="row mt-5">
                      <div class="col-6">
                          <h6 class="card-subtitle mb-2">Features</h6>
                          <ul class="card-text">
                            ${featureName}
                          </ul>
                      </div>
                      <!-- Integrations -->
                      <div class="col-6">
                          <h6 class="card-subtitle mb-2">Integrations</h6>

                          <ul class="card-text">
                          ${integrations
                            .map((integration) => `<li>${integration}</li>`)
                            .join("")}
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <!-- Second Card -->
      <div class="col-md-6 mb-4">
          <div class="card text-white bg-secondary mb-3" style="">
              <div class="card-body">
              <img src="${tool.image_link[0]}" class="card-img-top" alt="...">
              <h5 class="mb-5 text-center">${
                tool.input_output_examples[0].input
              }</h5>
              <p class="mb-5 text-center">${
                tool.input_output_examples[0].output
              }</p>
                  
<!-- end -->
</div>
</div>
      </div>
  </div>
</div>
    `;
  toolDetails.appendChild(modalDiv);
};

loadData();
