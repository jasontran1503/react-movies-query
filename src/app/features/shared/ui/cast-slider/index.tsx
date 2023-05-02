import { Cast } from '@common/models';
import defaultImage from '@images/default-image.jpg';
import { memo, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const responsive = {
  0: { items: 1 },
  340: { items: 2 },
  680: { items: 3 },
  1024: { items: 4 }
};

const CastSlider = memo(({ cast }: { cast: Cast[] }) => {
  const createItems = () =>
    cast.map((item, i) => (
      <div data-value={i + 1} className="item">
        {item && (
          <Link to={`/actor/${item.id}`}>
            <img
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w154${item.profile_path}`
                  : defaultImage
              }
              alt={item.name}
              title={item.name}
              style={{ width: '150px', height: '230px' }}
            />
          </Link>
        )}
      </div>
    ));

  const [items] = useState(createItems());

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      controlsStrategy="default"
      autoHeight={true}
      disableDotsControls
    />
  );
});

export default CastSlider;
