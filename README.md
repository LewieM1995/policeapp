## Project Description
This Next.js application utilizes the Police API to retrieve data and generate statistics based on longitude and latitude inputs. It features two main pages—one for searching by coordinates (lat/lng) and another for searching by a specific police force. The latter includes a dynamically generated list of police forces from the API, allowing users to visualize the full data object, not just a snippet. This is achieved by caching the data when user requests data from the api.

## Updates for Consideration
1.Enhanced Statistics: Introduce additional statistical features for a more comprehensive analysis.
Implement dynamic charting to visualize trends over time.

2.Improved User Experience: Enhance the user interface for better accessibility and user engagement.
Consider interactive maps for a more intuitive experience when searching by coordinates.

## Installation Instructions
Clone the Repository:

git clone https://github.com/LewieM1995/policeapp.git
cd policeap

Install Dependencies:
npm install

Create an Environment File:
Create a .env.local file at the root and store any private variables.

Run the Development Server:
npm run dev

Access the Application:
Open your browser and navigate to localhost:3000

## Note
Ensure that you have Node.js installed before following the above instructions. For more details about the Police API, refer to their documentation at Police API Documentation or provide a link to the specific API you are using.
